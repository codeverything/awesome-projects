/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import models from 'models'
import { Request } from 'express'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { getTotalExist, tanggalAndTimeGenerate } from 'helpers/Common'
import moment from 'moment'
import ResponseError from 'modules/Response/ResponseError'
import { Op } from 'sequelize'
import {
  includeLogLaundryMain,
  includeLogLaundryStock,
  includeUsedLinen,
  includeLaundryHK,
} from './modelInclude'

const {
  Linen,
  LogLinenLaundry,
  VendorLaundry,
  LinenSupplyChain,
  LogLinen,
} = models

class ListLinenHKService {
  /**
   * Get All Linen
   */
  public static async getAll(req: Request) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Linen,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [])
    )
    const allLinen = await Linen.findAll({
      ...queryFind,
      order: order.length ? order : [['updatedAt', 'desc']],
    })
    const total = await Linen.count({
      include: includeCount,
      where: queryFind.where,
    })
    const data: any[] = []
    for (const item in allLinen) {
      const linenSupply = await LinenSupplyChain.findAll({
        where: {
          LinenId: allLinen[item].id,
        },
      })
      const logLinenLaundry = await LogLinenLaundry.findAll({
        where: {
          LinenId: allLinen[item].id,
        },
      })
      const masukBersih = getTotalExist(linenSupply, 'masukBersih')
      const kotor = getTotalExist(linenSupply, 'keluarKotor')
      const hilangAkhir = getTotalExist(linenSupply, 'hilangAkhir')
      const rusakAkhir = getTotalExist(linenSupply, 'rusakAkhir')
      const keluarKotorlaundry = getTotalExist(logLinenLaundry, 'keluarKotor')
      const masukBersihLaundry = getTotalExist(logLinenLaundry, 'masukBersih')
      const totalKotor = kotor - keluarKotorlaundry
      const totalMasukBersih = masukBersih - kotor || 0
      data.push({
        id: allLinen[item].id,
        nama: allLinen[item].nama,
        total: allLinen[item].jumlah || 0,
        available:
          // eslint-disable-next-line prettier/prettier
          (allLinen[item].jumlah - keluarKotorlaundry - totalKotor - totalMasukBersih - hilangAkhir - rusakAkhir) + masukBersihLaundry || 0,
        used: totalMasukBersih,
        kotor: totalKotor || 0,
        laundry: keluarKotorlaundry - masukBersihLaundry || 0,
        hilang: hilangAkhir || 0,
        rusak: rusakAkhir || 0,
      })
    }

    return { message: `${total} data has been received.`, data, total }
  }

  public static async laundryHK(id: string) {
    const linen = await Linen.findByPk(id)
    const logLinenLaundry = await LogLinenLaundry.findAll({
      where: {
        LinenId: linen?.id,
      },
      include: includeLaundryHK,
      order: [['createdAt', 'desc']],
    })
    const listLogLinenLaundry = logLinenLaundry.map((x) => {
      return {
        id: x.id,
        vendor: x.VendorLaundry.nama,
        tanggal: moment(x.createdAt).format('DD/MM/yyyy'),
        waktu: moment(x.createdAt).format('HH:mm'),
        keluarKotor: x.keluarKotor,
        masukBersih: x.masukBersih,
        userId: x.UserId,
      }
    })
    const data = {
      nama: linen?.nama,
      tanggal: moment().locale('id').format('LL'),
      time: moment().format('HH:mm'),
      listLogLaundry: listLogLinenLaundry,
    }
    return data
  }

  public static async detailUpdateLinen(id: string) {
    const linen = await Linen.findByPk(id)
    const data = {
      id: linen?.id,
      nama: linen?.nama,
      jumlah: linen?.jumlah,
    }
    return data
  }

  public static async getDetailLinen(id: string) {
    const linen: any = await Linen.findByPk(id)
    const linenSupply = await LinenSupplyChain.findAll({
      where: {
        LinenId: linen.id,
      },
    })

    const logLinenLaundry = await LogLinenLaundry.findAll({
      where: {
        LinenId: linen.id,
      },
    })
    const masukBersih = getTotalExist(linenSupply, 'masukBersih')
    const kotor = getTotalExist(linenSupply, 'keluarKotor')
    const keluarKotorlaundry = getTotalExist(logLinenLaundry, 'keluarKotor')
    const masukBersihLaundry = getTotalExist(logLinenLaundry, 'masukBersih')
    const hilangAkhir = getTotalExist(linenSupply, 'hilangAkhir')
    const rusakAkhir = getTotalExist(linenSupply, 'rusakAkhir')
    const totalKotor = kotor - keluarKotorlaundry || 0
    const totalMasukBersih = masukBersih - kotor
    const data = {
      id: linen.id,
      nama: linen.nama,
      total: linen.jumlah || 0,
      kotor: totalKotor,
      hilang: hilangAkhir || 0,
      rusak: rusakAkhir || 0,
      used: totalMasukBersih || 0,
      laundry: keluarKotorlaundry - masukBersihLaundry || 0,
      available:
        // eslint-disable-next-line prettier/prettier
        (linen?.jumlah - keluarKotorlaundry - totalKotor - totalMasukBersih - hilangAkhir - rusakAkhir) + masukBersihLaundry || 0,
    }
    return data
  }

  public static async usedLinen(id: string, req: Request) {
    const { order } = PluginSqlizeQuery.generate(req, LinenSupplyChain, [])
    const linenSupply = await LinenSupplyChain.findAll({
      where: {
        LinenId: id,
      },
      include: includeUsedLinen,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const used: any[] = []
    const usedKamarIdList: any[] = []
    for (let i = 0; i < linenSupply.length; i += 1) {
      const masukBersih = getTotalExist(
        linenSupply.filter((x) => x.KamarId === linenSupply[i].KamarId),
        'masukBersih'
      )
      const keluarKotor = getTotalExist(
        linenSupply.filter((x) => x.KamarId === linenSupply[i].KamarId),
        'keluarKotor'
      )
      used.push({
        nomorKamar: linenSupply[i].Kamar.nomor,
        SpesifikasiKamar: linenSupply[i].Kamar.SpesifikasiKamar.nama,
        jumlah: masukBersih - keluarKotor,
        isDuplicate: usedKamarIdList.includes(linenSupply[i].KamarId),
      })
      usedKamarIdList.push(linenSupply[i].KamarId)
    }
    const filteredUsed = used.filter((x) => !x.isDuplicate && x.jumlah !== 0)
    const data = {
      used: filteredUsed,
    }
    return data
  }

  public static async laundryLinen(id: string, req: Request) {
    const { order } = PluginSqlizeQuery.generate(req, LinenSupplyChain, [])
    const vendorLaundry = await VendorLaundry.findAll({
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const laundry: any[] = []
    for (const item in vendorLaundry) {
      const linen = await LogLinenLaundry.findAll({
        where: {
          VendorLaundryId: vendorLaundry[item].id,
          LinenId: id,
        },
      })
      let totalMasukBersih: number = 0
      let totalKeluarKotor: number = 0
      if (linen.length > 0) {
        totalMasukBersih = getTotalExist(linen, 'masukBersih')
        totalKeluarKotor = getTotalExist(linen, 'keluarKotor')
      }
      laundry.push({
        VendorLaundry: vendorLaundry[item].nama,
        jumlah: totalKeluarKotor - totalMasukBersih || 0,
      })
    }
    const data = {
      laundry,
    }
    return data
  }

  public static async logLinenStock(req: Request, id: string) {
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      LogLinenLaundry,
      includeLogLaundryStock
    )
    queryFind.where = {
      [Op.and]: {
        LinenId: id,
      },
      ...queryFind.where,
    }
    const linen = await LogLinen.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await LogLinen.count({
      include: includeCount,
      where: queryFind.where,
    })
    const data = linen.map((x) => {
      return {
        id: x.id,
        tanggal: tanggalAndTimeGenerate(x.updatedAt, 'DD-MM-YYYY'),
        jam: tanggalAndTimeGenerate(x.updatedAt, 'HH.mm'),
        MasterCategoryId: x.MasterCategoryId,
        MasterCategory: x.MasterCategory,
        log: x.log,
        keterangan: x.activity,
        jumlah: x.jumlah,
        penanggungJawab: x.namaStaff,
      }
    })

    return { message: `${total} data has been received.`, data, total }
  }

  public static async laundryLinenMain(req: Request) {
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      LogLinenLaundry,
      includeLogLaundryMain
    )

    const linen = await LogLinenLaundry.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await LogLinenLaundry.count({
      include: includeCount,
      where: queryFind.where,
    })
    const data = linen.map((x) => {
      return {
        id: x.id,
        tanggal: tanggalAndTimeGenerate(x.updatedAt, 'll'),
        jam: tanggalAndTimeGenerate(x.updatedAt, 'HH:mm'),
        linen: x.nama,
        keluarKotor: x.keluarKotor,
        masukBersih: x.masukBersih,
        staff: x.namaStaff || '-',
        vendor: x.VendorLaundry.nama,
      }
    })

    return { message: `${total} data has been received.`, data, total }
  }

  public static async detailLaundry(id: string) {
    const data = await LogLinenLaundry.findByPk(id)
    if (!data) throw new ResponseError.NotFound('Data Tidak Ditemukan')
    return data
  }
}

export default ListLinenHKService
