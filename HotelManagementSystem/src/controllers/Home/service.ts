/* eslint-disable array-callback-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
import models from 'models'
import { Op } from 'sequelize'
import moment from 'moment'
import generateExcel from 'helpers/generateExcell'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'

import { ReservasiKamarAttributes } from 'models/reservasikamar'
import ReservasiListService from 'controllers/ReservasiList/service'
import useValidation from 'helpers/useValidation'
import ResponseError from 'modules/Response/ResponseError'
import { head, last } from 'lodash'
import { includingGetAll } from '../Reservasi/modelInclude'
import schema from './schema'

interface GenerateExcel {
  startDate: Date
  endDate: Date
}

const { Kamar, Reservasi, ReservasiKamar, ProfileHotel } = models

class hargaspesifikasikamarService {
  /**
   * Get All Role
   */
  public static async getCountAll(req: any) {
    const available = await Kamar.count()
    const Reserved = await ReservasiKamar.count({
      where: {
        createdAt: {
          [Op.substring]: moment().format('YYYY-MM-DD'),
        },
      },
    })
    const checkIn = await ReservasiKamar.count({
      where: {
        tanggalCheckIn: {
          [Op.substring]: moment().format('YYYY-MM-DD'),
        },
      },
    })
    const reservasi = await Reservasi.findAll({
      include: [
        {
          model: ReservasiKamar,
        },
      ],
    })
    const profileHotel = await ProfileHotel.findOne()
    const today = moment()
    const filteredReservasi = reservasi.filter((x) => {
      if (
        moment(moment(x.tanggalAwalCheckIn).subtract(1, 'day')).isBefore(
          today,
          'day'
        ) &&
        moment(x.tanggalAkhirCheckOut).isAfter(today, 'day')
      ) {
        return x
      }
    })
    let countBookedKamar: number = 0
    for (const item in filteredReservasi) {
      countBookedKamar += filteredReservasi[item].ReservasiKamars.length
    }

    const checkOut = await ReservasiKamar.count({
      where: {
        tanggalCheckOut: {
          [Op.substring]: moment().format('YYYY-MM-DD'),
        },
      },
    })
    return {
      profileHotelPath: profileHotel?.profileHotelPath,
      nama: profileHotel?.nama,
      Available: available - countBookedKamar,
      Reserved,
      PlannedToCheckIn: checkIn,
      PlannedToCheckOut: checkOut,
      tanggalHariIni: moment().locale('id').format('LL'),
    }
  }

  public static async generateDataExcell(formData: GenerateExcel) {
    useValidation(schema.generateExcell, formData)
    const { startDate, endDate } = formData
    // get data yang sesuai tanggal reservasi tanggal awal dan tanggal akhir
    const dataValue = await Reservasi.findAll({
      where: {
        tanggalReservasi: {
          [Op.between]: [
            moment(startDate).startOf('day').toDate(),
            moment(endDate).endOf('day').toDate(),
          ],
        },
      },
      // soft delete karena data dibutuhkan di reservasi dan getOne reservasi
      paranoid: false,
      include: includingGetAll,
      order: [['createdAt', 'desc']],
    })
    const data: any[] = []
    // olah data dan tambah properti di bawah jika dibutuhkan
    for (const item in dataValue) {
      const listKamar: any[] = []
      // eslint-disable-next-line no-await-in-loop
      const getDetailInvoice = await ReservasiListService.getDetailInvoice(
        dataValue[item].id
      )
      dataValue[item].dataValues.detailInvoice = getDetailInvoice
      dataValue[item].ReservasiKamars.filter(
        (x: ReservasiKamarAttributes) => x.Kamar
      ).map((x: ReservasiKamarAttributes) => listKamar.push(x.Kamar!.nomor))
      dataValue[item].dataValues.listKamar = listKamar.join(' ')
      data.push(dataValue[item])
    }
    if (!data.length)
      throw new ResponseError.BadRequest(
        'Data Reservasi Tidak Ditemukan Mohon Ganti Tanggal'
      )
    // title dinamis sesuai dengan data startDate dan last date
    const titleCSV =
      PluginSqlizeQuery.containTanggal.length > 0
        ? `Laporan_Reservasi_per_tanggal ${head(
            PluginSqlizeQuery.containTanggal
          )} - ${last(PluginSqlizeQuery.containTanggal)}`
        : `Laporan Reservasi Tanpa Filter`
    return {
      data,
      titleCSV,
    }
  }

  public static async excelGenerate(data: any) {
    // Column Untuk Excell data diolah di Helpers generate excel
    const header = [
      // { header: 'No', key: 'no', width: 5 },
      { header: 'Tanggal Reservasi', key: 'tanggalReservasi', width: 15 },
      { header: 'Nomor Kamar', key: 'listKamar', width: 15 },
      {
        header: 'Status',
        key: 'MasterStatusPemesananNama',
        width: 18,
      },
      {
        header: 'Tipe Tamu',
        key: 'MasterTipeTamuNama',
        width: 18,
      },
      { header: 'Nama Tamu', key: 'namaTamu', width: 22 },
      {
        header: 'Source Pemesanan',
        key: 'MasterSourcePemesananNama',
        width: 17,
      },
      {
        header: 'Tanggal Check In',
        key: 'tanggalAwalCheckIn',
        width: 25,
      },
      {
        header: 'Tanggal Check Out',
        key: 'tanggalAkhirCheckOut',
        width: 25,
      },
      {
        header: 'Tipe Kamar',
        key: 'SpesifikasiKamarNama',
        width: 25,
      },
      {
        header: 'Tipe Pembayaran',
        key: 'MasterJenisPembayaranNama',
        width: 25,
      },
      {
        header: 'Total Tagihan (Exclude Additional)',
        key: 'getTotalTagihan',
        width: 25,
      },
      {
        header: 'Status Pembayaran',
        key: 'MasterStatusPembayaranNama',
        width: 25,
      },
    ]
    // variable stream ynag punya tipe Data Buffer
    const stream: Buffer = await generateExcel(header, data)
    return stream
  }
}

export default hargaspesifikasikamarService
