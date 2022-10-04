/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { Op } from 'sequelize'
import { ReservasiKamarAttributes } from 'models/reservasikamar'
import { ReservasiAttributes } from 'models/reservasi'
import { IInvoiceTagihan } from 'helpers/baseInterface'
import {
  ConstMasterStatusPemesanan,
  ConstMasterFasilitasTambahan,
  ConstMasterStatusPembayaran,
  ConstMasterTipeTamu,
  ConstMasterStatusKamar,
} from 'constants/index'
import Pdf from 'config/pdf'
import { Request } from 'express'
import {
  getTotal,
  getBalance,
  changeDateLocaleId,
  getTotalExist,
  toInteger,
  formatNumber,
} from 'helpers/Common'
import LogHargaDefaultSpesifikasiKamar from 'models/loghargadefaultspesifikasikamar'
import {
  includeBaseInvoice,
  includeTambahan,
  includingGetAll,
  includingGetOne,
  includeGetDetailInvoice,
} from '../Reservasi/modelInclude'

const {
  InvoicePembayaran,
  InvoiceRefund,
  InvoiceTagihan,
  InvoiceTambahan,
  Reservasi,
  HargaSpesifikasiKamar,
} = models

class ReservasiService {
  public static async getAll(req: Request) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Reservasi,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, includingGetAll)
    )
    const dataValue = await Reservasi.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    // queryFind.where = queryFind.where.tanggalAwalCheckIn || queryFind.where.tanggalAkhriCheckOut ? queryFind.where.tanggalAwalCheckIn =
    const data: ReservasiAttributes[] = []
    // eslint-disable-next-line no-plusplus
    for (const item in dataValue) {
      const listKamar: any[] = []
      dataValue[item].ReservasiKamars.filter(
        (x: ReservasiKamarAttributes) => x.Kamar
      ).map((x: ReservasiKamarAttributes) => listKamar.push(x.Kamar!.nomor))
      dataValue[item].dataValues.listKamar = listKamar.join(' ')
      data.push(dataValue[item])
    }
    const filterData = data.map((x) => {
      return {
        id: x.id,
        MasterStatusPemesananId: x.MasterStatusPemesananId,
        MasterStatusPemesanan: x.MasterStatusPemesanan,
        MasterSourcePemesananId: x.MasterSourcePemesananId,
        MasterSourcePemesanan: x.MasterSourcePemesanan,
        MasterStatusPembayaranId: x.MasterStatusPembayaranId,
        MasterStatusPembayaran: x.MasterStatusPembayaran,
        tanggalAwalCheckIn: x.tanggalAwalCheckIn,
        tanggalAkhirCheckOut: x.tanggalAkhirCheckOut,
        InformasiOrang: {
          nama: x.PerusahaanId ? x.Perusahaan.nama : x.InformasiOrang.nama,
          MasterTipeTamuId: x.InformasiOrang.MasterTipeTamuId,
          MasterTipeTamu: x.MasterTipeTamuId
            ? x.MasterTipeTamu
            : x.InformasiOrang.MasterTipeTamu,
        },
        listKamar: x.dataValues.listKamar,
      }
    })
    const total = await Reservasi.count({
      include: includeCount,
      where: queryFind.where,
    })

    return {
      message: `${total} data has been received.`,
      data: filterData,
      total,
    }
  }

  public static async getAllReserved(req: Request) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Reservasi,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, includingGetAll)
    )
    queryFind.where = {
      [Op.and]: [
        {
          ...queryFind.where,
        },
        {
          MasterStatusPemesananId: {
            [Op.or]: [
              ConstMasterStatusPemesanan.RESERVED,
              ConstMasterStatusPemesanan.CANCELED,
            ],
          },
        },
      ],
    }

    const dataValue = await Reservasi.findAll({
      ...queryFind,
      order: order.length
        ? order
        : [
            ['isSelesai', 'asc'],
            ['createdAt', 'desc'],
          ],
    })
    const data: any[] = []
    // eslint-disable-next-line no-plusplus
    for (const item in dataValue) {
      const listKamar: any[] = []
      dataValue[item].ReservasiKamars.filter(
        (x: any) => x.Kamar
      ).map((x: any) => listKamar.push(x.Kamar.nomor))
      dataValue[item].dataValues.listKamar = listKamar.join(' ')
      data.push(dataValue[item])
    }
    const total = await Reservasi.count({
      include: includeCount,
      where: queryFind.where,
    })
    const filterData = data.map((x) => {
      return {
        id: x.id,
        MasterStatusPemesananId: x.MasterStatusPemesananId,
        MasterStatusPemesanan: x.MasterStatusPemesanan,
        MasterSourcePemesananId: x.MasterSourcePemesananId,
        MasterSourcePemesanan: x.MasterSourcePemesanan,
        MasterStatusPembayaranId: x.MasterStatusPembayaranId,
        MasterStatusPembayaran: x.MasterStatusPembayaran,
        tanggalAwalCheckIn: x.tanggalAwalCheckIn,
        tanggalAkhirCheckOut: x.tanggalAkhirCheckOut,
        InformasiOrang: {
          nama: x.PerusahaanId ? x.Perusahaan.nama : x.InformasiOrang.nama,
          MasterTipeTamuId: x.InformasiOrang.MasterTipeTamuId,
          MasterTipeTamu: x.MasterTipeTamuId
            ? x.MasterTipeTamu
            : x.InformasiOrang.MasterTipeTamu,
        },
        listKamar: x.dataValues.listKamar,
      }
    })
    return {
      message: `${total} data has been received.`,
      data: filterData,
      total,
    }
  }

  public static async getDetailInvoice(id: string, isShow: boolean = true) {
    const data: any = await Reservasi.findByPk(id, {
      include: includeGetDetailInvoice,
    })
    const invoiceTagihan = await InvoiceTagihan.findAll({
      where: { ReservasiId: id },
      order: [
        ['namaSpesifikasiKamar', 'desc'],
        ['tanggalMenginap', 'asc'],
      ],
    })
    const listInvoiceTagihan: any[] = []
    for (const item in invoiceTagihan) {
      listInvoiceTagihan.push({
        tanggal: `${changeDateLocaleId(data.tanggalReservasi)}`,
        item: invoiceTagihan[item].keteranganFasilitasTambahan
          ? `${invoiceTagihan[item].keteranganFasilitasTambahan} \n (${invoiceTagihan[item].tanggalMenginap})`
          : `${invoiceTagihan[item].namaSpesifikasiKamar} \n (${invoiceTagihan[item].tanggalMenginap})`,
        amount: invoiceTagihan[item].nilaiHarga,
        satuan: invoiceTagihan[item].satuan,
        jumlah: invoiceTagihan[item].jumlah,
        promoHarga: !invoiceTagihan[item].promoNilai
          ? 0
          : invoiceTagihan[item].promoNilai,
        totalHarga:
          invoiceTagihan[item].nilaiHarga * invoiceTagihan[item].jumlah,
      })
      data.dataValues.InvoiceTagihan = listInvoiceTagihan
    }
    // throw new ResponseError.BadRequest('asdsad')
    const invoicePembayaran = await InvoicePembayaran.findAll({
      where: { ReservasiId: id },
      order: [['createdAt', 'asc']],
      include: includeBaseInvoice,
    })
    invoicePembayaran.forEach((item: any) => {
      if (
        item.MasterItemPembayaranId === ConstMasterFasilitasTambahan.LAINNYA
      ) {
        item.dataValues.MasterItemPembayaran = {
          nama: 'Lainnya',
        }
      }
    })
    const invoiceRefund = await InvoiceRefund.findAll({
      where: { ReservasiId: id },
      order: [['createdAt', 'asc']],
      include: includeBaseInvoice,
    })
    invoiceRefund.forEach((item: any) => {
      if (
        item.MasterItemPembayaranId === ConstMasterFasilitasTambahan.LAINNYA
      ) {
        item.dataValues.MasterItemPembayaran = {
          nama: 'Lainnya',
        }
      }
    })
    data.dataValues.InvoicePembayaran = invoicePembayaran
    data.dataValues.InvoiceRefund = invoiceRefund
    const invoiceTambahan: any = await InvoiceTambahan.findAll({
      where: {
        ReservasiId: id,
      },
      order: [['createdAt', 'asc']],
      include: includeTambahan,
    })
    const listTambahan: any[] = []
    for (const item in invoiceTambahan) {
      const {
        ReservasiKamar,
        MasterItemTagihan,
        MasterFasilitasTambahan,
        keteranganFasilitasTambahan,
      } = invoiceTambahan[item]
      let condition: string = ''
      let satuan: string = ''
      let keterangan: string = '-'

      if (
        invoiceTambahan[item].MasterItemTagihanId &&
        !invoiceTambahan[item].keteranganSwap
      ) {
        condition = `${MasterItemTagihan.nama}`
        satuan = MasterItemTagihan.satuan
        keterangan = invoiceTambahan[item].keterangan
      } else if (ReservasiKamar || MasterFasilitasTambahan) {
        condition = `${
          ReservasiKamar
            ? `${ReservasiKamar.SpesifikasiKamar.nama} (extend)`
            : MasterFasilitasTambahan.JenisFasilitasTambahan.nama
        }${
          keteranganFasilitasTambahan
            ? `, ${keteranganFasilitasTambahan} (extend)`
            : ''
        }`
        satuan = ReservasiKamar
          ? ReservasiKamar.MasterSatuan.nama
          : MasterFasilitasTambahan.MasterSatuan.nama
      } else if (
        (invoiceTambahan[item].keterangan &&
          !invoiceTambahan[item].keteranganSwap) ||
        (invoiceTambahan[item].MasterFasilitasTambahanId ===
          ConstMasterFasilitasTambahan.LAINNYA &&
          !invoiceTambahan[item].keteranganSwap)
      ) {
        keterangan = `${invoiceTambahan[item].keterangan || '-'}`
        condition = invoiceTambahan[item].keteranganSwap
          ? `${invoiceTambahan[item].keteranganSwap}`
          : 'Lainnya'
        satuan = '-'
      }
      if (invoiceTambahan[item].keteranganSwap) {
        keterangan = `${invoiceTambahan[item].keterangan || '-'}`
        condition = invoiceTambahan[item].keteranganSwap
          ? `${invoiceTambahan[item].keteranganSwap}`
          : 'Lainnya'
        satuan = invoiceTambahan[item].MasterSatuan.nama
      }
      listTambahan.push({
        tanggal: changeDateLocaleId(invoiceTambahan[item].createdAt),
        item: condition,
        promo: invoiceTambahan[item].nilaiDiskon,
        keterangan,
        satuan,
        amount: invoiceTambahan[item].nilaiHarga,
        jumlah: invoiceTambahan[item].jumlah,
        totalHarga:
          invoiceTambahan[item].nilaiHarga * invoiceTambahan[item].jumlah -
          invoiceTambahan[item].nilaiDiskon,
      })
    }
    const listKamar: any[] = []
    data.ReservasiKamars.filter((x: ReservasiKamarAttributes) => {
      if (!x.KamarId) {
        return []
      }
      return x.Kamar
      // eslint-disable-next-line array-callback-return
    }).map((x: ReservasiKamarAttributes) => {
      if (!x.KamarId) {
        return []
      }
      listKamar.push(x.Kamar!.nomor)
    })
    data.dataValues.totalPromo = getTotalExist(listInvoiceTagihan, 'promoHarga')
    data.dataValues.InvoiceTambahan = listTambahan.sort()
    data.dataValues.totalInvoiceTambahan = getTotalExist(
      listTambahan,
      'totalHarga'
    )
    data.dataValues.subTotalTagihan = getTotal(listInvoiceTagihan, 'totalHarga')
    data.dataValues.totalInvoiceTagihan =
      getTotal(listInvoiceTagihan, 'totalHarga') - data.dataValues.totalPromo
    data.dataValues.totalInvoicePembayaran = getTotalExist(
      invoicePembayaran,
      'nilai'
    )
    data.dataValues.totalInvoiceRefund = getTotalExist(invoiceRefund, 'nilai')
    data.dataValues.totalBalance = getBalance({
      totalTambahan: data.dataValues.totalInvoiceTambahan,
      totalTagihan: data.dataValues.totalInvoiceTagihan,
      totalPembayaran: data.dataValues.totalInvoicePembayaran,
      totalRefund: getTotalExist(invoiceRefund, 'nilai'),
    })
    data.dataValues.listKamar = listKamar.join(' ')
    let result: any = {
      namaPemesan: data.InformasiOrang.nama,
      email: data.InformasiOrang.email,
      MasterSourcePemesanan: data.MasterSourcePemesanan,
      nomorInvoice: data.nomorInvoice,
      isSelesai: data.isSelesai,
      tanggalReservasi: changeDateLocaleId(data.tanggalReservasi),
      MasterStatusPembayaran: data.MasterStatusPembayaran,
      listKamar: data.dataValues.listKamar,
      InvoiceTagihan: data.dataValues.InvoiceTagihan,
      InvoiceTambahan: data.dataValues.InvoiceTambahan,
      InvoicePembayaran: data.dataValues.InvoicePembayaran,
      InvoiceRefund: data.dataValues.InvoiceRefund,
      totalTagihan: data.dataValues.totalInvoiceTagihan,
      subTotalTagihan: data.dataValues.subTotalTagihan,
      totalTambahan: data.dataValues.totalInvoiceTambahan,
      totalPromo: data.dataValues.totalPromo,
      total:
        data.dataValues.totalInvoiceTambahan +
        data.dataValues.totalInvoiceTagihan,
      totalPembayaran: data.dataValues.totalInvoicePembayaran,
      totalRefund: data.dataValues.totalInvoiceRefund,
      balance: data.dataValues.totalBalance,
      path: data.path,
    }
    if (
      data.MasterStatusPembayaranId === ConstMasterStatusPembayaran.LUNAS &&
      data.MasterStatusPemesananId === ConstMasterStatusPemesanan.CHECKED_OUT
    ) {
      result = {
        ...result,
        selesaiButtonActive: true,
      }
    } else {
      result = {
        ...result,
        selesaiButtonActive: false,
      }
    }
    // Generate PDF
    Pdf.GeneratePDF(result, async function (err: any, res: any) {
      const filePath = `/${res.filename.split('/').splice(5, 5).join('/')}`
      console.log(`Success Generate Pdf`)
      await data.update({
        path: filePath,
      })
    })
    return result
  }

  public static async getOne(id: string) {
    const data = await Reservasi.findByPk(id, { include: includingGetOne })
    const invoice = await this.getDetailInvoice(id)
    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }
    for (const item in data.ReservasiKamars) {
      const { ReservasiFasilitasTambahans } = data.ReservasiKamars[item]
      let hargaExtendPerMalam = await HargaSpesifikasiKamar.findOne({
        where: {
          SpesifikasiKamarId: data.ReservasiKamars[item].SpesifikasiKamarId,
        },
        order: [['createdAt', 'desc']],
      })
      if (!hargaExtendPerMalam) {
        hargaExtendPerMalam = await LogHargaDefaultSpesifikasiKamar.findOne({
          where: {
            SpesifikasiKamarId: data.ReservasiKamars[item].SpesifikasiKamarId,
          },
        })
      }
      data.ReservasiKamars[item].dataValues.extendValues = {
        isExtend: data.ReservasiKamars[item].isExtend,
        buttonExtend: data.ReservasiKamars[item].buttonExtend,
      }
      data.ReservasiKamars[item].dataValues.isButtonShow =
        data.ReservasiKamars[item].MasterStatusKamarId ===
        ConstMasterStatusKamar.CHECKED_OUT
      const listItem: any[] = []
      const listHargaFasilitasTambahan: any[] = []
      listItem.push(data.ReservasiKamars[item].SpesifikasiKamar.nama)
      for (const item in ReservasiFasilitasTambahans) {
        const { MasterFasilitasTambahan } = ReservasiFasilitasTambahans[item]
        listItem.push(MasterFasilitasTambahan.JenisFasilitasTambahan.nama)
        listHargaFasilitasTambahan.push(
          MasterFasilitasTambahan.LogHargaMasterFasilitasTambahan.harga *
            ReservasiFasilitasTambahans[item].jumlah
        )
      }
    }
    let buttonDisabled = false
    if (
      data.MasterStatusPembayaranId ===
        ConstMasterStatusPembayaran.BELUM_LUNAS &&
      data.InformasiOrang.MasterTipeTamuId !== ConstMasterTipeTamu.COORPORATE
    ) {
      buttonDisabled = true
    }
    data.dataValues.isButtonDisabled = buttonDisabled
    data.dataValues.batalReservasiDetail = {
      balance: formatNumber(invoice.balance),
      namaPemesan: invoice.namaPemesan,
      nomorKamar: invoice.listKamar,
    }
    const modInvoiceTagihan = invoice.InvoiceTagihan.map(
      (item: IInvoiceTagihan) => {
        return {
          tanggal: item.tanggal,
          item: item.item,
          amount: !item.amount ? 0 : toInteger(item.amount),
          satuan: item.satuan,
          jumlah: item.jumlah,
          totalHarga: !item.amount ? 0 : toInteger(item.totalHarga),
        }
      }
    )
    data.InformasiOrang.dataValues.MasterTipeTamu = data.PerusahaanId
      ? {
          nama: 'Corporate',
        }
      : data.InformasiOrang.MasterTipeTamu
    data.dataValues.detailTagihan = {
      itemData: modInvoiceTagihan,
      totalPromo: toInteger(invoice.totalPromo),
      totalTagihan: toInteger(invoice.totalTagihan),
      subTotalTagian: invoice.subTotalTagihan,
    }
    return data
  }
  // Ini masih WIP

  public static async getAllCheckinCheckout(req: Request) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Reservasi,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, includingGetAll)
    )
    queryFind.where = {
      [Op.and]: [
        {
          ...queryFind.where,
        },
        {
          MasterStatusPemesananId: [
            ConstMasterStatusPemesanan.CHECKED_OUT,
            ConstMasterStatusPemesanan.CHECKED_IN,
          ],
        },
      ],
    }
    const dataValue = await Reservasi.findAll({
      ...queryFind,
      order: order.length ? order : [['tanggalAwalCheckIn', 'desc']],
    })
    const data: any[] = []
    for (const item in dataValue) {
      const listKamar: any[] = []
      dataValue[item].ReservasiKamars.filter(
        (x: ReservasiKamarAttributes) => x.Kamar
      ).map((x: ReservasiKamarAttributes) => listKamar.push(x.Kamar!.nomor))
      dataValue[item].dataValues.listKamar = listKamar.join(' ')
      data.push(dataValue[item])
    }
    const total = await Reservasi.count({
      include: includeCount,
      where: queryFind.where,
    })

    const filterData = data.map((x) => {
      return {
        id: x.id,
        MasterStatusPemesananId: x.MasterStatusPemesananId,
        MasterStatusPemesanan: x.MasterStatusPemesanan,
        MasterSourcePemesananId: x.MasterSourcePemesananId,
        MasterSourcePemesanan: x.MasterSourcePemesanan,
        MasterStatusPembayaranId: x.MasterStatusPembayaranId,
        MasterStatusPembayaran: x.MasterStatusPembayaran,
        tanggalAwalCheckIn: x.tanggalAwalCheckIn,
        tanggalAkhirCheckOut: x.tanggalAkhirCheckOut,
        InformasiOrang: {
          nama: x.PerusahaanId ? x.Perusahaan.nama : x.InformasiOrang.nama,
          MasterTipeTamuId: x.PerusahaanId
            ? ConstMasterTipeTamu.COORPORATE
            : x.InformasiOrang.MasterTipeTamuId,
          MasterTipeTamu: x.PerusahaanId
            ? {
                nama: 'Corporate',
              }
            : x.InformasiOrang.MasterTipeTamu,
        },
        listKamar: x.dataValues.listKamar,
      }
    })

    return {
      message: `${total} data has been received.`,
      data: filterData,
      total,
    }
  }

  public static async getAllInvoice(req: Request) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Reservasi,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, includingGetAll)
    )
    const dataValue: any = await Reservasi.findAll({
      ...queryFind,
      order: order.length ? order : [['tanggalReservasi', 'desc']],
    })
    const data: any[] = []
    // eslint-disable-next-line no-plusplus
    for (const item in dataValue) {
      const listKamar: any[] = []
      dataValue[item].ReservasiKamars.filter(
        (x: ReservasiKamarAttributes) => x.Kamar
      ).map((x: ReservasiKamarAttributes) => listKamar.push(x.Kamar!.nomor))
      dataValue[item].dataValues.listKamar = listKamar.join(' ')
      data.push(dataValue[item])
    }
    const total = await Reservasi.count({
      include: includeCount,
      where: queryFind.where,
    })
    const filterData = data.map((x) => {
      return {
        id: x.id,
        tanggalReservasi: x.tanggalReservasi,
        nomorInvoice: x.nomorInvoice,
        MasterStatusPembayaranId: x.MasterStatusPembayaranId,
        MasterStatusPembayaran: x.MasterStatusPembayaran,
        tanggalAwalCheckIn: x.tanggalAwalCheckIn,
        tanggalAkhirCheckOut: x.tanggalAkhirCheckOut,
        InformasiOrang: {
          nama: x.PerusahaanId ? x.Perusahaan.nama : x.InformasiOrang.nama,
          MasterTipeTamuId: x.InformasiOrang.MasterTipeTamuId,
          MasterTipeTamu: x.MasterTipeTamuId
            ? x.MasterTipeTamu
            : x.InformasiOrang.MasterTipeTamu,
        },
        listKamar: x.dataValues.listKamar,
      }
    })
    return {
      message: `${total} data has been received.`,
      data: filterData,
      total,
    }
  }

  public static async getBatalReservasiDetail(id: string) {
    const data = await this.getDetailInvoice(id)
    const result = {
      totalPembayaran: data.totalPembayaran || 0,
      namaPemesan: data?.namaPemesan,
      nomorKamar: data.listKamar || '',
    }
    return result
  }
}

export default ReservasiService
