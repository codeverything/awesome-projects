/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import models from 'models'
import { Request } from 'express'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { Transaction, Op } from 'sequelize'
import { IUpdatePengambilanBarang } from 'helpers/baseInterface'
import { tanggalAndTimeGenerate } from 'helpers/Common'
import useValidation from 'helpers/useValidation'
import { ConstMasterStatusLostAndFound } from 'constants/index'
import { join, map, head } from 'lodash'
import ReservasikKamarKamar from 'models/reservasikamar-kamar'
import LostAndFound from 'models/lostandfound'
import LogLostAndFound from 'models/loglostandfound'
import { getAll } from './modelInclude'
import schema from './schema'

const { ReservasiKamar, MasterStatusLostAndFound, Kamar } = models

class LogInventoryService {
  /**
   * Get All LogLostAndFound
   */
  public static async getAll(req: Request) {
    const { filtered } = req.query
    const { order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      ReservasiKamar,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [])
    )
    queryFind.where = {
      [Op.and]: [
        {
          MasterStatusLostAndFoundId: {
            [Op.ne]: null,
          },
        },
        queryFind.where,
      ],
    }
    const reservasiKamar = await ReservasiKamar.findAll({
      include: getAll,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const reservasiKamarKamar = await ReservasikKamarKamar.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const reservasiKamarList = map(reservasiKamar, (x) => x.id)
    const data = reservasiKamarKamar
      .filter((x) => reservasiKamarList.includes(x.ReservasiKamarId))
      .map(async (itemData, index) => {
        const dataKamar = await ReservasiKamar.findOne({
          include: getAll,
          where: {
            id: itemData.ReservasiKamarId,
          },
        })
        const dataLostAndFound = await LogLostAndFound.findAll({
          where: {
            KamarId: itemData.KamarId,
            ReservasiKamarId: itemData.ReservasiKamarId,
          },
        })
        const kamar = await Kamar.findByPk(itemData.KamarId)
        const masterStatusLostAndFound = await MasterStatusLostAndFound.findByPk(
          itemData.MasterStatusLostAndFoundId
        )
        return {
          id: itemData.id,
          nomorKamar: kamar?.nomor,
          atasNama: head(dataKamar.LogLostAndFounds)!.atasNama,
          tanggalCheckout: tanggalAndTimeGenerate(
            dataKamar.tanggalCheckOut,
            'll'
          ),
          tanggalDitemukan: head(dataKamar.LogLostAndFounds)!.tanggalDitemukan,
          namaBarang: join(
            map(dataLostAndFound, (x) => x.namaBarang),
            ', '
          ),
          nomorHandphone: head(dataKamar.LogLostAndFounds)!.noHandphone,
          MasterStatusLostAndFoundId: itemData.MasterStatusLostAndFoundId,
          MasterStatusLostAndFound: masterStatusLostAndFound,
        }
      })
    const result = await Promise.all(data)
    const total = data.length
    return {
      message: `${total} data has been received.`,
      data: result,
      total,
    }
  }

  /**
   * static async
   */
  public static async getAllMasterLostAndFound(req: Request) {
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      MasterStatusLostAndFound,
      []
    )

    const data = await MasterStatusLostAndFound.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await MasterStatusLostAndFound.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  public static async getDetail(id: string) {
    const reservasiKamarKamar = await ReservasikKamarKamar.findByPk(id)
    const dataLostAndFound = await LogLostAndFound.findAll({
      where: {
        ReservasiKamarId: reservasiKamarKamar?.ReservasiKamarId,
        KamarId: reservasiKamarKamar?.KamarId,
      },
    })
    const modBarang = map(dataLostAndFound, (x) => {
      return {
        namaBarang: x.namaBarang,
        jumlah: x.jumlah,
      }
    })
    const data = {
      id: reservasiKamarKamar?.id,
      barang: modBarang,
      diambilOleh: reservasiKamarKamar?.diambilOleh,
      tanggalDiambil: reservasiKamarKamar?.tanggalDiambil,
      MasterStatusLostAndFoundId:
        reservasiKamarKamar?.MasterStatusLostAndFoundId,
    }
    return data
  }

  public static async updateBarangHilang(
    formData: IUpdatePengambilanBarang,
    id: string,
    txn: Transaction
  ) {
    useValidation(schema.updateLostAndFound, formData)
    const data = await ReservasikKamarKamar.findByPk(id)
    await data?.update(
      {
        diambilOleh: formData.diambilOleh,
        tanggalDiambil: formData.tanggalDiambil,
        MasterStatusLostAndFoundId: ConstMasterStatusLostAndFound.DIAMBIL,
      },
      {
        transaction: txn,
      }
    )
    return data
  }

  public static async finishLostAndFound(id: string) {
    const reservasiKamar = await this.getDetail(id)
    const pengambilan = await ReservasiKamar.findByPk(id)
    const data = {
      barang: reservasiKamar.barang,
      diambilOleh: pengambilan?.diambilOleh,
      tanggalDiambil: tanggalAndTimeGenerate(pengambilan?.tanggalDiambil, 'LL'),
    }
    return data
  }
}

export default LogInventoryService
