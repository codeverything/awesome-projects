/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { Request } from 'express'
import statusKamar from 'constants/ConstMasterStatusKamar'
import constStatusHk from 'constants/ConstMasterStatusHK'
import { Transaction, Op } from 'sequelize'
import { map, sum, isString, filter, uniqBy } from 'lodash'
import { IKamarCreate } from 'helpers/baseInterface'
import moment from 'moment'
import ReservasiListService from '../ReservasiList/service'
import { includingGetAll, includingOne } from './modelInclude'
import schema from './schema'

const {
  Kamar,
  SpesifikasiKamar,
  ConnectingDoor,
  MasterStatusHK,
  ReservasiKamar,
  HargaSpesifikasiKamar,
  LogHargaDefaultSpesifikasiKamar,
} = models

class KamarService {
  public static async getAllKamarExcludeLowPrice(
    req: Request,
    reservasiKamarId: string
  ) {
    const { filtered } = req.query
    const { order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Kamar,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, includingGetAll)
    )
    const reservasiKamar = await ReservasiKamar.findByPk(reservasiKamarId)
    let hargaKamar = await HargaSpesifikasiKamar.findOne({
      where: {
        SpesifikasiKamarId: reservasiKamar?.SpesifikasiKamarId,
      },
    })
    if (
      !hargaKamar ||
      moment(moment()).isAfter(moment(hargaKamar?.tanggalSelesai))
    ) {
      hargaKamar = await LogHargaDefaultSpesifikasiKamar.findOne({
        where: { SpesifikasiKamarId: reservasiKamar?.SpesifikasiKamarId },
      })
    }
    const spesifiKamar = await SpesifikasiKamar.findAll({
      include: [
        {
          model: LogHargaDefaultSpesifikasiKamar,
        },
        {
          model: HargaSpesifikasiKamar,
        },
      ],
    })
    const dataFiltered = filter(spesifiKamar, (x) => {
      if (x.HargaSpesifikasiKamar) {
        return x.HargaSpesifikasiKamar.harga >= hargaKamar?.harga
      }
      return x.LogHargaDefaultSpesifikasiKamar!.harga >= hargaKamar?.harga
    })
    const distinctSpesifikasi = uniqBy(dataFiltered, 'id')
    const totalKamar: any[] = []
    const listData: any[] = []
    for (const item in distinctSpesifikasi) {
      queryFind.where = {
        [Op.and]: [
          {
            MasterStatusKamarId: statusKamar.CHECKED_OUT,
            MasterStatusHKId: constStatusHk.AVAILABLE_CLEAN,
            SpesifikasiKamarId: distinctSpesifikasi[item].id,
          },
          {
            id: {
              [Op.not]: reservasiKamar?.KamarId,
            },
          },
        ],
      }
      const kamar = await Kamar.findAll({
        ...queryFind,
        include: includingGetAll,
        order: order.length ? order : [['nomor', 'asc']],
      })
      for (const element in kamar) {
        if (kamar[element].ConnectingDoors!.length > 0) {
          kamar[element].dataValues.connected = true
        } else {
          kamar[element].dataValues.connected = false
        }
      }
      totalKamar.push(kamar.length)
      listData.push({
        spesifikasiKamar: distinctSpesifikasi[item],
        kamar,
      })
    }
    const total = sum(totalKamar)
    return {
      message: `${total} data has been received.`,
      data: listData,
      total,
    }
  }

  public static async getAllKamarNotConnect(req: Request) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Kamar,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, includingGetAll)
    )
    const kamar = await ConnectingDoor.findAll()
    const connectKamarId = map(kamar, (x) => x.KamarConnectId).filter((x) => x)
    queryFind.where = {
      id: {
        [Op.not]: connectKamarId,
      },
    }
    const data = await Kamar.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await Kamar.count({
      include: includeCount,
      where: queryFind.where,
    })
    return {
      message: `${total} data has been received.`,
      data,
      total,
    }
  }

  public static async getAll(req: Request, reservasiId: string) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Kamar,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, includingGetAll)
    )
    const data = await Kamar.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await Kamar.count({
      include: includeCount,
      where: queryFind.where,
    })
    const filterData = map(data, (x) => {
      return {
        id: x.id,
        nomor: x.nomor,
        SpesifikasiKamarId: x.SpesifikasiKamarId,
        namaSpesifikasiKamar: x.SpesifikasiKamar!.nama,
        statusHkId: x.MasterStatusHKId,
        statusHk: x.MasterStatusHK!.nama,
        statusKamarId: x.MasterStatusKamarId,
        statusKamar: x.MasterStatusKamar!.nama,
        keterangan: x.keterangan,
      }
    })
    return {
      message: `${total} data has been received.`,
      data: filterData,
      total,
    }
  }

  public static async getAllBySpec(req: Request, reservasiId: string) {
    const { filtered } = req.query
    const { order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Kamar,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, includingGetAll)
    )
    const reservasi = await ReservasiListService.getOne(reservasiId)
    const listSpesifikasi = map(
      reservasi.ReservasiKamars,
      (x) => x.SpesifikasiKamarId
    )

    queryFind.where = {
      ...queryFind.where,
      MasterStatusKamarId: statusKamar.CHECKED_OUT,
    }
    const spesifikasiKamar = await SpesifikasiKamar.findAll({
      attributes: ['id', 'nama'],
      where: {
        id: listSpesifikasi,
      },
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const totalKamar: any[] = []
    const listData: Array<object> = []
    for (const item in spesifikasiKamar) {
      queryFind.where = {
        ...queryFind.where,
        MasterStatusKamarId: statusKamar.CHECKED_OUT,
        MasterStatusHKId: constStatusHk.AVAILABLE_CLEAN,
        SpesifikasiKamarId: spesifikasiKamar[item].id,
      }
      const kamar = await Kamar.findAll({
        ...queryFind,
        include: [
          {
            model: ConnectingDoor,
          },
          {
            model: MasterStatusHK,
          },
        ],
        order: order.length ? order : [['nomor', 'asc']],
      })
      for (const element in kamar) {
        if (kamar[element].ConnectingDoors!.length > 0) {
          kamar[element].dataValues.connected = true
        } else {
          kamar[element].dataValues.connected = false
        }
      }
      totalKamar.push(kamar.length)
      listData.push({
        spesifikasiKamar: spesifikasiKamar[item],
        kamar,
      })
    }
    const total = sum(totalKamar)

    return {
      message: `${total} data has been received.`,
      data: listData,
      total,
    }
  }

  public static async getOne(id: string) {
    const data = await Kamar.findByPk(id, { include: includingOne })

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }
    const connectingDoor = await ConnectingDoor.findOne({
      where: {
        [Op.or]: [
          {
            KamarConnectId: id,
          },
          {
            KamarId: id,
          },
        ],
      },
    })
    data.dataValues.connected = !!data.keterangan
    data.dataValues.kamarConnectId =
      connectingDoor?.KamarConnectId === id
        ? connectingDoor.KamarId
        : connectingDoor?.KamarConnectId
    return data
  }

  public static async create(formData: IKamarCreate, txn: Transaction) {
    useValidation(schema.create, formData)

    const data = await Kamar.create(
      { ...formData },
      {
        transaction: txn,
      }
    )
    if (formData.connected === true || formData.connected === 'true') {
      data.update(
        { keterangan: `Connected to No. ${formData.kamar.nomor}` },
        {
          transaction: txn,
        }
      )
      const kamar = await Kamar.findOne({
        where: {
          id: formData.kamar.id,
        },
      })
      await kamar?.update(
        { keterangan: `Connected to No. ${data.nomor}` },
        {
          transaction: txn,
        }
      )
      await ConnectingDoor.create(
        { KamarId: data.id, KamarConnectId: formData.kamar.id },
        {
          transaction: txn,
        }
      )
    }

    return data
  }

  public static async update(
    id: string,
    formData: IKamarCreate,
    txn: Transaction
  ) {
    useValidation(schema.create, formData)
    const data = await this.getOne(id)
    let connectingDoor = await ConnectingDoor.findOne({
      where: {
        [Op.or]: [
          {
            KamarConnectId: id,
          },
          {
            KamarId: id,
          },
        ],
      },
    })
    if (!connectingDoor && formData.connected === true) {
      connectingDoor = await ConnectingDoor.create({
        KamarConnectId: formData.kamar.id,
        KamarId: id,
      })
    }
    if (isString(formData.keterangan) && formData.keterangan) {
      delete formData.keterangan
    }
    const connectedKamar = await Kamar.findByPk(
      connectingDoor?.KamarConnectId === id
        ? connectingDoor.KamarId
        : connectingDoor?.KamarConnectId
    )

    if (formData.connected === true || formData.connected === 'true') {
      await connectedKamar?.update(
        { keterangan: null },
        {
          transaction: txn,
        }
      )
      await connectingDoor?.update(
        { KamarConnectId: formData.kamar.id },
        {
          transaction: txn,
        }
      )
      const kamar = await Kamar.findOne({
        where: {
          id: formData.kamar.id,
        },
      })
      await kamar?.update(
        { keterangan: `Connected to No. ${data.nomor}` },
        {
          transaction: txn,
        }
      )
      await data.update(
        {
          ...formData,
          keterangan: `Connected to No. ${formData.kamar.nomor}`,
        } || {}
      )
    } else {
      await data.update(
        {
          ...formData,
          keterangan: null,
        } || {},
        {
          transaction: txn,
        }
      )
      await connectedKamar?.update(
        { keterangan: null },
        {
          transaction: txn,
        }
      )
      await connectingDoor?.destroy()
    }
    return data
  }

  public static async delete(id: string) {
    const data = await this.getOne(id)
    data.destroy()
    return data
  }
}

export default KamarService
