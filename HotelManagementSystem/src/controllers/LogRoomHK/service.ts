/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import models from 'models'
import { Request } from 'express'
import ResponseError from 'modules/Response/ResponseError'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { ConstMasterStatusLostAndFound, ConstRole } from 'constants/index'
import { LogKamarAttributes } from 'models/logkamar'
import { map, isEqual, head, last, filter } from 'lodash'
import { Op } from 'sequelize'
import {
  checkTanggal,
  checkValueExist,
  pemeriksaGenerate,
  formatTanggal,
  tanggalAndTimeGenerate,
} from 'helpers/Common'
import ReservasikKamarKamar from 'models/reservasikamar-kamar'
import {
  includeGetOne,
  includingGetAll,
  includeReservasiItemKamar,
} from './modelInclude'

const {
  ReservasiKamar,
  Kamar,
  Linen,
  SpesifikasiKamarLinen,
  SpesifikasiKamarItem,
  ItemKamar,
  ReservasiKamarItemKamar,
  LogKamar,
  Amenity,
  LostAndFound,
  MasterStatusHK,
  LogChecker,
  LinenSupplyChain,
  LogLinenSupplyChain,
  AmenitySupply,
  Reservasi,
  InformasiOrang,
  SpesifikasiKamarAmenity,
} = models

class RoomHKService {
  public static async getAll(req: Request) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Kamar,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, includingGetAll)
    )
    const result = await Kamar.findAll({
      ...queryFind,
      order: order.length ? order : [['updatedAt', 'desc']],
    })
    const total = await Kamar.count({
      include: includeCount,
      where: queryFind.where,
    })
    const data = result.map((x) => {
      return {
        id: x.id,
        nomor: x.nomor,
        spesifikasiKamar: x.SpesifikasiKamar!.nama,
        maxTamu: x.SpesifikasiKamar!.maxTamu,
        lastUpdateTanggal: checkTanggal(x, 'LL'),
        lastUpdateWaktu: tanggalAndTimeGenerate(x.updatedAt, 'HH:mm'),
        statusHk: x.MasterStatusHK,
        SpesifikasiKamar: x.SpesifikasiKamar,
      }
    })

    return { message: `${total} data has been received.`, data, total }
  }

  public static async getOne(id: string, req: Request) {
    const dataKamar = await Kamar.findByPk(id, { include: includeGetOne })
    const data = {
      id: dataKamar?.id,
      room: `${dataKamar?.nomor}, ${dataKamar?.SpesifikasiKamar!.nama}`,
      MasterStatusHKId: dataKamar?.MasterStatusHKId,
      MasterStatusHK: dataKamar?.MasterStatusHK,
      specKamarId: dataKamar?.SpesifikasiKamarId,
      dateAndTime: `${checkTanggal(dataKamar, 'LL')} | ${checkTanggal(
        dataKamar,
        'HH.mm'
      )}`,
    }
    return data
  }

  public static async getOneKamarLinen(id: string, req: Request) {
    const { filtered } = req.query
    const { order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Kamar,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [])
    )
    const dataKamar = await Kamar.findByPk(id, { include: includeGetOne })
    const dataSpecKamar = await SpesifikasiKamarLinen.findAll({
      where: {
        SpesifikasiKamarId: dataKamar?.SpesifikasiKamarId,
      },
    })
    const listLinenId = dataSpecKamar.map((x) => x.LinenId)
    queryFind.where = {
      [Op.and]: [
        {
          id: listLinenId,
        },
        {
          ...queryFind.where,
        },
      ],
    }
    const linen = await Linen.findAll({
      ...queryFind,
      order: order.length ? order : [['updatedAt', 'desc']],
    })
    const listLinen: any[] = []
    for (const item in linen) {
      listLinen.push({
        id: linen[item].id,
        nama: linen[item].nama,
      })
    }
    const data = {
      listLinen,
    }
    return data
  }

  public static async getOneKamarItemKamar(id: string, req: Request) {
    const { filtered } = req.query
    const { order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Kamar,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [])
    )
    const dataKamar = await Kamar.findByPk(id, { include: includeGetOne })
    const dataSpecKamar = await SpesifikasiKamarItem.findAll({
      where: {
        SpesifikasiKamarId: dataKamar?.SpesifikasiKamarId,
      },
    })
    const listItemKamarId = map(dataSpecKamar, (x) => x.ItemKamarId)
    queryFind.where = {
      [Op.and]: [
        {
          id: listItemKamarId,
        },
        {
          ...queryFind.where,
        },
      ],
    }
    const itemKamar = await ItemKamar.findAll({
      ...queryFind,
      order: order.length ? order : [['updatedAt', 'desc']],
    })
    const listItemKamar: any[] = []
    for (const item in itemKamar) {
      listItemKamar.push({
        id: itemKamar[item].id,
        nama: itemKamar[item].nama,
      })
    }
    const data = {
      listItemKamar,
    }
    return data
  }

  public static async getLeaderChecker(id: string, req: Request) {
    const { filtered } = req.query
    const { order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      ReservasiKamarItemKamar,
      PluginSqlizeQuery.makeIncludeQueryable(
        filtered,
        includeReservasiItemKamar
      )
    )
    const reservasiItemKamar = await ReservasiKamarItemKamar.findOne({
      where: {
        KamarId: id,
      },
      order: [['createdAt', 'desc']],
    })

    const reservasiKamar = await ReservasiKamar.findOne({
      where: {
        id: reservasiItemKamar?.ReservasiKamarId || null,
      },
      order: [['createdAt', 'desc']],
    })
    console.log(reservasiKamar)
    queryFind.where = {
      [Op.and]: [
        {
          KamarId: id,
          ReservasiKamarId: reservasiKamar?.id || null,
        },
        {
          ...queryFind.where,
        },
      ],
    }
    const itemBarang = await ReservasiKamarItemKamar.findAll({
      ...queryFind,
      order: order.length ? order : [['updatedAt', 'desc']],
      include: includeReservasiItemKamar,
    })
    const data: any[] = []
    for (const item in itemBarang) {
      const logchecker = await LogChecker.findOne({
        where: {
          ReservasiKamarItemKamarId: itemBarang[item].id,
        },
      })
      data.push({
        id: itemBarang[item].id,
        nama: itemBarang[item].LinenId
          ? itemBarang[item].Linen.nama
          : itemBarang[item].ItemKamar.nama,
        status: itemBarang[item].MasterTagihanKerusakanKehilangan.nama,
        jumlah: itemBarang[item].jumlah,
        MasterTipeBarangId: itemBarang[item].MasterTipeBarangId,
        MasterTipeBarang: itemBarang[item].MasterTipeBarang,
        pemeriksa: pemeriksaGenerate(
          logchecker,
          logchecker?.nama,
          logchecker?.updatedAt
        ),
      })
    }
    return data
  }

  public static async getLinenSupply(id: string, req: Request) {
    const { filtered } = req.query
    const { order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Linen,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [])
    )
    const result = await this.getOne(id, req)
    const reservasiKamar = await ReservasiKamar.findOne({
      where: {
        KamarId: result.id,
      },
      order: [['updatedAt', 'desc']],
    })
    const spesifikasiKamar = await SpesifikasiKamarLinen.findAll({
      where: {
        SpesifikasiKamarId: result.specKamarId,
      },
    })
    const linenId = map(spesifikasiKamar, (x) => x.LinenId)
    queryFind.where = {
      [Op.and]: [
        {
          id: linenId,
        },
        {
          ...queryFind.where,
        },
      ],
    }
    const linen = await Linen.findAll({
      ...queryFind,
      order: order.length ? order : [['updatedAt', 'desc']],
    })
    const listLinenSupply: any[] = []
    for (const item in linen) {
      let linenSupply = await LinenSupplyChain.findOne({
        where: {
          LinenId: linen[item].id,
          KamarId: id,
          ReservasiKamarId: reservasiKamar?.id || null,
        },
      })
      if (!linenSupply) {
        linenSupply = await LinenSupplyChain.create({
          KamarId: id,
          LinenId: linen[item].id,
          ReservasiKamarId: reservasiKamar?.id,
        })
      }
      const logLinenSupply = await LogLinenSupplyChain.findOne({
        where: {
          LinenSupplyChainId: linenSupply.id,
        },
        order: [['createdAt', 'desc']],
      })
      listLinenSupply.push({
        id: linenSupply.id,
        LinenId: linen[item].id,
        namaLinen: linen[item].nama,

        masukBersih: checkValueExist(linenSupply, 'masukBersih'),
        keluarKotor: checkValueExist(linenSupply, 'keluarKotor'),
        hilangAwal: checkValueExist(linenSupply, 'hilangAwal'),
        hilangAkhir: checkValueExist(linenSupply, 'hilangAkhir'),
        rusakAwal: checkValueExist(linenSupply, 'rusakAwal'),
        rusakAkhir: checkValueExist(linenSupply, 'rusakAkhir'),
        lastUpdate: pemeriksaGenerate(
          logLinenSupply,
          logLinenSupply?.namaStaff,
          logLinenSupply?.updatedAt
        ),
        triggerDifferent: !!(
          linenSupply?.rusakAwal !== linenSupply?.rusakAkhir ||
          linenSupply?.hilangAwal !== linenSupply?.hilangAkhir
        ),
      })
    }
    return { data: listLinenSupply, message: ` data has been received` }
  }

  public static async getLeaderAmenities(id: string, req: Request) {
    const { filtered } = req.query
    const { order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Amenity,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [])
    )
    const reservasiKamarKamar = await ReservasikKamarKamar.findOne({
      where: {
        KamarId: id,
      },
      order: [['createdAt', 'desc']],
    })
    const reservasiKamar = await ReservasiKamar.findOne({
      where: {
        KamarId: id,
      },
      order: [['createdAt', 'desc']],
    })
    const kamar = await Kamar.findByPk(id)
    queryFind.where = {
      [Op.and]: [
        {
          KamarId: reservasiKamarKamar?.KamarId,
          ReservasiKamarId: reservasiKamarKamar?.ReservasiKamarId,
        },
        {
          ...queryFind.where,
        },
      ],
    }
    const logAmenity = await AmenitySupply.findAll({
      ...queryFind,
      order: order.length ? order : [['updatedAt', 'desc']],
      include: [
        {
          model: Amenity,
        },
      ],
    })
    const data = map(logAmenity, (x) => {
      return {
        id: x.id,
        nama: x.Amenity?.nama,
        jumlah: x.jumlah,
        lastUpdate: x.lastUpdate || '-',
      }
    })
    return data
  }

  public static async getLeaderLostAndFound(id: string, req: Request) {
    const { filtered } = req.query
    const { order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      LostAndFound,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [])
    )
    const reservasiKamarKamar = await ReservasikKamarKamar.findOne({
      where: {
        KamarId: id,
      },
      order: [['createdAt', 'desc']],
    })
    let reservasiKamar: any
    if (!reservasiKamarKamar) {
      reservasiKamar = await ReservasiKamar.findOne({
        where: {
          KamarId: id,
        },
        order: [['createdAt', 'desc']],
      })
    } else {
      reservasiKamar = await ReservasiKamar.findOne({
        where: {
          id: reservasiKamarKamar?.ReservasiKamarId,
        },
        order: [['createdAt', 'desc']],
      })
    }
    let buttonDisabled = false
    queryFind.where = {
      [Op.and]: [
        {
          KamarId: id,
          MasterStatusLostAndFoundId: ConstMasterStatusLostAndFound.TERTINGGAL,
          ReservasiKamarId: reservasiKamar?.id || null,
        },
        {
          ...queryFind.where,
        },
      ],
    }

    const reservasi = await Reservasi.findOne({
      where: {
        id: reservasiKamar?.ReservasiId || null,
      },
      include: [
        {
          model: InformasiOrang,
        },
      ],
    })
    const lostAndFound = await LostAndFound.findAll({
      ...queryFind,
      order: order.length ? order : [['updatedAt', 'desc']],
    })

    const listLostAndFound = map(lostAndFound, (x) => {
      return {
        id: x.id,
        item: x.namaBarang,
        jumlah: x.jumlah,
        lastUpdate: x.lastUpdate,
      }
    })
    if (
      isEqual(
        reservasiKamar?.MasterStatusLostAndFoundId,
        ConstMasterStatusLostAndFound.DIAMBIL
      )
    )
      buttonDisabled = true
    const data = {
      informasiTamuTerakhir: {
        atasNama: reservasi?.InformasiOrang?.nama,
        tanggalCheckOut: tanggalAndTimeGenerate(
          reservasi?.tanggalAkhirCheckOut,
          'll'
        ),
        buttonDisabled,
        listLostAndFound,
      },
    }
    return data
  }

  public static async getLogKamar(id: string, req: Request) {
    const { filtered } = req.query
    const { order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      LogKamar,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [
        {
          model: MasterStatusHK,
        },
      ])
    )
    const kamar = await this.getOne(id, req)
    queryFind.where = {
      [Op.and]: [
        {
          KamarId: id,
        },
        {
          ...queryFind.where,
        },
      ],
    }
    const logKamar = await LogKamar.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const result = logKamar.map((x: LogKamarAttributes) => {
      return {
        id: x.id,
        tanggal: tanggalAndTimeGenerate(x.createdAt, 'LL'),
        waktu: tanggalAndTimeGenerate(x.createdAt, 'HH.mm'),
        MasterStatusHK: x.MasterStatusHK,
      }
    })
    const total = await LogKamar.count({
      ...queryFind,
    })

    const data = {
      id: kamar.id,
      nomor: head(kamar.room.split(',')),
      specKamar: last(kamar.room.split(',')),
      logKamar: result,
    }

    return { data, total, message: `${total} data has been received` }
  }

  public static async getLogLinen(id: string, req: Request) {
    const { filtered } = req.query
    const { order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      LogLinenSupplyChain,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [])
    )
    queryFind.where = {
      [Op.and]: [
        {
          KamarId: id,
        },
        {
          ...queryFind.where,
        },
      ],
    }
    const linenSupply = await LogLinenSupplyChain.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
      include: [
        {
          model: Linen,
        },
      ],
    })
    const listLinenSupply = linenSupply.map((x) => {
      return {
        logLinenId: x.id,
        LinenId: x.LinenId,
        namaLinen: x.Linen?.nama,
        tanggal: formatTanggal(x.updatedAt),
        waktu: tanggalAndTimeGenerate(x.updatedAt, 'HH.mm'),
        namaStaff: x.namaStaff,
        masukBersih: checkValueExist(x, 'masukBersih'),
        keluarKotor: checkValueExist(x, 'keluarKotor'),
        hilangAwal: checkValueExist(x, 'hilangAwal'),
        hilangAkhir: checkValueExist(x, 'hilangAkhir'),
        rusakAwal: checkValueExist(x, 'rusakAwal'),
        rusakAkhir: checkValueExist(x, 'rusakAkhir'),
      }
    })
    return { data: listLinenSupply, message: ` data has been received` }
  }

  public static async getLinenBySpesifikasi(id: string, req: Request) {
    const kamar = await this.getOne(id, req)
    const linenSupply = await LinenSupplyChain.findAll({
      where: {
        KamarId: id,
      },
    })
    const listLinenId = map(linenSupply, (x) => x.LinenId)
    const specKamarLinen = await SpesifikasiKamarLinen.findAll({
      where: {
        SpesifikasiKamarId: kamar.specKamarId,
      },
    })
    const listLinenSupplyId = map(
      filter(specKamarLinen, (x) => !listLinenId.includes(x.LinenId)),
      (x) => x.LinenId
    )
    const data = await Linen.findAll({
      where: {
        id: listLinenSupplyId,
      },
    })
    const total = await Linen.count({
      where: {
        id: listLinenSupplyId,
      },
    })
    return {
      data,
      total,
      message: `${total} data has been received`,
    }
  }

  public static async getOneLinenSupply(id: string) {
    const result = await LinenSupplyChain.findOne({
      where: {
        id,
      },
    })
    if (!result) throw new ResponseError.NotFound('Data tidak ada')
    const data = {
      id: result.id,
      masukBersih: result.masukBersih || 0,
      keluarKotor: result.keluarKotor || 0,
      hilangAwal: result.hilangAwal || 0,
      rusakAwal: result.rusakAwal || 0,
      hilangAkhir: result.hilangAkhir || 0,
      rusakAkhir: result.rusakAkhir || 0,
      KamarId: result.KamarId,
      LinenId: result.LinenId,
    }
    return data
  }

  public static async getOneAmenitySupply(id: string) {
    const result = (await AmenitySupply.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Amenity,
        },
      ],
    })) as any
    if (!result) throw new ResponseError.NotFound('Data tidak ada')
    const data = {
      id: result.id,
      AmenityId: result.AmenityId,
      nama: result.Amenity.nama,
      jumlah: result.jumlah,
      lastUpdate: result.lastUpdate,
    }
    return data
  }

  public static async getOneLostAndFound(id: string) {
    const result = await LostAndFound.findOne({
      where: {
        id,
      },
    })
    if (!result) throw new ResponseError.NotFound('Data tidak ada')
    const data = {
      id: result.id,
      namaBarang: result.namaBarang,
      jumlah: result.jumlah,
      lastUpdate: result.lastUpdate,
    }
    return data
  }
}

export default RoomHKService
