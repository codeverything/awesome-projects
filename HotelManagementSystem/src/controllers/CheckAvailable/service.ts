/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import moment from 'moment'
import sequelize, { Model, Op } from 'sequelize'
import masterStatusHK from 'constants/ConstMasterStatusHK'
import calculatePajak from 'modules/CalculatePajak'
import { LogHargaDefaultSpesifikasiKamarAttributes } from 'models/loghargadefaultspesifikasikamar'
import MasterSpecialRequirement from 'models/masterspecialrequirement'
import useValidation from 'helpers/useValidation'
import { durationCalc } from 'helpers/Common'
import CheckAvailable from 'modules/CheckAvailable/CheckAvailable'
import schema from './schema'

const {
  MasterFasilitasTambahan,
  LogHargaMasterFasilitasTambahan,
  JenisFasilitasTambahan,
  SpesifikasiKamar,
  ReservasiKamar,
  Reservasi,
  Kamar,
  MasterTipeKamar,
  MasterTipeKasur,
  LogHargaDefaultSpesifikasiKamar,
  HargaSpesifikasiKamar,
} = models

class InformasiKamarService {
  public static async getReservasiKamarByTanggalCheckInOut(
    options = {
      idsSpesifikasiKamar: [],
      valFromDate: moment().format('YYYY-MM-DD'),
      valToDate: moment().format('YYYY-MM-DD'),
    }
  ) {
    const { idsSpesifikasiKamar, valFromDate, valToDate } = options

    const tanggalCheckIn = `CAST(tanggalCheckIn AS DATE)`
    const tanggalCheckOut = `CAST(tanggalCheckOut AS DATE)`

    // noinspection UnnecessaryLocalVariableJS
    const reservasiKamars = await ReservasiKamar.findAll({
      where: {
        SpesifikasiKamarId: {
          [Op.in]: idsSpesifikasiKamar,
        },
        [Op.or]: {
          /*
                Batas bawah
                Check From Date harus lebih besar dari tanggal check In
                dan tanggal check out harus lebih besar dari from date juga
                 */
          fromRange: sequelize.literal(`
                ${valFromDate} >= ${tanggalCheckIn} AND
                ${tanggalCheckOut} > ${valFromDate}
                `),
          /*
                Batas Atas
                Check To Date harus lebih besar dari tanggal Check in
                dan tanggal check out harus lebih besar dari From Date
                 */
          toRange: sequelize.literal(`
                ${valToDate} >= ${tanggalCheckIn} AND
                ${tanggalCheckOut} > ${valFromDate}
                `),
        },
      },
      raw: true,
    })

    return reservasiKamars
  }

  public static async calculateReservasi(options: any) {
    let jumlahTagihan: number = 0
    const listHargaFasilitasTambahan: any[] = []
    const detailItem: any[] = []
    let totalKamar: number = 0
    for (const item in options.ReservasiKamars) {
      const {
        MasterSpecialRequirementId,
        MasterTipeKamarId,
        MasterTipeKasurId,
        tanggalCheckIn,
        tanggalCheckOut,
        ReservasiFasilitasTambahans,
      } = options.ReservasiKamars[item]
      const { logHarga, data }: any = await this.checkAvailable({
        MasterSpecialRequirementId,
        MasterTipeKamarId,
        MasterTipeKasurId,
        tanggalCheckIn,
        tanggalCheckOut,
      })
      const spesifikasiKamar: any = await SpesifikasiKamar.findByPk(
        logHarga.SpesifikasiKamarId,
        {
          include: [
            {
              model: MasterTipeKasur,
            },
            {
              model: MasterTipeKamar,
            },
            { model: MasterSpecialRequirement },
          ],
        }
      )
      const duration = Math.floor(
        Math.abs(
          moment
            .duration(moment(tanggalCheckIn).diff(moment(tanggalCheckOut)))
            .asDays()
        )
      )
      const fasilitasTambahan: any = []
      detailItem.push({
        tanggal: `${moment(tanggalCheckIn)
          .locale('id')
          .format('LL')} - ${moment(tanggalCheckOut)
          .locale('id')
          .format('LL')}`,
        nama: data.detailItem.nama,
        tipeKamar: spesifikasiKamar?.MasterTipeKamar.nama,
        tipeKasur: spesifikasiKamar.MasterTipeKasur.nama,
        specialRequirement: spesifikasiKamar?.MasterSpecialRequirement.nama,
        durasi: duration,
        fasilitasTambahan,
        totalHargaKamar: logHarga.harga * duration,
        hargaKamar: logHarga.harga,
      })
      jumlahTagihan += logHarga?.harga * duration
      totalKamar += 1
      for (const element in ReservasiFasilitasTambahans) {
        const dataMasterFasilitasTambahan = await MasterFasilitasTambahan.findOne(
          {
            where: {
              id:
                ReservasiFasilitasTambahans[element].MasterFasilitasTambahanId,
            },
          }
        )
        const jenisFasilitasTambahan: any = await JenisFasilitasTambahan.findOne(
          {
            where: {
              id: dataMasterFasilitasTambahan?.JenisFasilitasTambahanId,
            },
          }
        )
        const harga = await LogHargaMasterFasilitasTambahan.findAll({
          where: {
            MasterFasilitasTambahanId: dataMasterFasilitasTambahan?.id,
          },
        })
        const nominal = harga.map((x) => x.harga)
        fasilitasTambahan.push({
          tanggal: `${moment(tanggalCheckIn)
            .locale('id')
            .format('LL')} - ${moment(tanggalCheckOut)
            .locale('id')
            .format('LL')}`,
          id: jenisFasilitasTambahan.id,
          nama: jenisFasilitasTambahan.nama,
          jumlah: ReservasiFasilitasTambahans[element].jumlah,
          harga: { ...nominal }[0],
          totalHarga:
            // eslint-disable-next-line prettier/prettier
            ({ ...nominal }[0] * ReservasiFasilitasTambahans[element].jumlah) * duration,
        })
        harga.forEach((x) => {
          listHargaFasilitasTambahan.push(
            // eslint-disable-next-line prettier/prettier
            (x.harga * ReservasiFasilitasTambahans[element].jumlah) * duration
          )
        })
      }
    }
    const result =
      listHargaFasilitasTambahan.length || listHargaFasilitasTambahan.length > 0
        ? listHargaFasilitasTambahan.reduce((acc, curVal) => acc + curVal)
        : 0
    jumlahTagihan += result
    const totalTagihan = jumlahTagihan
    const data = {
      detailItem,
      totalTagihan,
      jumlahTagihan,
      pajak: calculatePajak(jumlahTagihan),
      totalKamar,
    }
    return data
  }

  public static async checkAvailable(options: any) {
    const {
      SpesifikasiKamarId,
      // MasterSpecialRequirementId,
      // MasterTipeKamarId,
      // MasterTipeKasurId,
      tanggalCheckIn,
      tanggalCheckOut,
    } = options
    const checkAvail = new CheckAvailable()
    useValidation(schema.checkSpesifikasi, options)
    const valFromDate = `
        '${moment(tanggalCheckIn).format('YYYY-MM-DD')}'`
    const valToDate = `
        '${moment(tanggalCheckOut).format('YYYY-MM-DD')}'`
    // const spesifikasiKamar = await SpesifikasiKamar.findOne({
    //   where: {
    //     MasterSpecialRequirementId,
    //     MasterTipeKamarId,
    //     MasterTipeKasurId,
    //   },
    // })
    const spesifikasiKamar = await SpesifikasiKamar.findOne({
      where: {
        id: SpesifikasiKamarId,
      },
    })
    // Jika Spesifikasi Kamar yang tersedia tidak ditemukan
    if (!spesifikasiKamar)
      throw new ResponseError.NotFound('Spesifikasi Kamar tidak ditemukan')
    const spesifikasiKamars = await SpesifikasiKamar.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      where: {
        ...(spesifikasiKamar
          ? {
              id: spesifikasiKamar.id,
            }
          : {}),
      },
    })

    /*
      Get semua total kamar yang tersedia dispesifikasi tersebut
       */
    const kamars = await Kamar.findAll<Model>({
      attributes: [
        'SpesifikasiKamarId',
        [sequelize.literal(`COUNT(id)`), 'total'],
      ],
      where: {
        [Op.not]: {
          MasterStatusHKId: [
            masterStatusHK.OUT_OF_OPERATION,
            masterStatusHK.OWNER,
          ],
        },
      },
      group: ['SpesifikasiKamarId'],
      raw: true,
    })
    const mapKamarBySpesifikasi = kamars.reduce((acc: any, curVal) => {
      const { SpesifikasiKamarId, total }: any = curVal
      if (!acc[SpesifikasiKamarId]) {
        acc[SpesifikasiKamarId] = {
          total,
        }
      }
      return acc
    }, {})
    const used = 'booked'
    const total = 'totalKamar'
    const available = 'available'
    const kamarBySpesifikasi = await Kamar.findAll({
      where: { SpesifikasiKamarId: spesifikasiKamar.id },
    })
    // ambil id kamar id
    const listKamar = kamarBySpesifikasi.map((x) => x.id)
    const bookedKamar = await ReservasiKamar.findAll({
      where: {
        KamarId: listKamar,
      },
    })

    const listBookedKamarCheckOut = bookedKamar.map((x) => x.tanggalCheckOut)
    listBookedKamarCheckOut.sort((a: any, b: any) => a - b)
    const reservasi: any = await Reservasi.findAll({
      include: [
        {
          model: ReservasiKamar,
        },
      ],
    })
    // checking available atau tidak sesuai tanggal dan spesifikasi kamar tersebut
    const maxReserved = checkAvail.check(
      new Date(valFromDate),
      new Date(valToDate),
      reservasi,
      spesifikasiKamar.id
    )
    // Grouping by total, nama spesifikasi, isAvailable, used
    const defaultSpesifikasi = spesifikasiKamars.reduce((acc: any, curVal) => {
      const { id, nama } = curVal
      const dataKamar = mapKamarBySpesifikasi[id] || {
        total: 0,
      }
      if (dataKamar) {
        const totalKamar = dataKamar ? dataKamar.total : 0
        if (!acc[id]) {
          acc.detailItem = {
            nama,
            [total]: totalKamar,
            [available]: totalKamar - maxReserved,
            // eslint-disable-next-line prettier/prettier
            isAvailable: Boolean((totalKamar - maxReserved) > 0),
            [used]: maxReserved,
          }
        }
      }
      return acc
    }, {})
    // Cari Harga Kamar per tanggal Jika tidak ada ambil harga default
    let logHarga = await HargaSpesifikasiKamar.findOne({
      where: { SpesifikasiKamarId: spesifikasiKamar.id },
      order: [['createdAt', 'desc']],
    })
    if (
      !logHarga ||
      moment(moment(valFromDate)).isAfter(moment(logHarga?.tanggalSelesai))
    ) {
      logHarga = await LogHargaDefaultSpesifikasiKamar.findOne({
        where: { SpesifikasiKamarId: spesifikasiKamar.id },
      })
    }
    // list harga Kamar Beda2
    const duration = durationCalc(new Date(valFromDate), new Date(valToDate))

    const listReservasi: Array<any> = []
    for (let i = 0; i < duration; i += 1) {
      let hargaKamar = await HargaSpesifikasiKamar.findOne({
        where: { SpesifikasiKamarId: spesifikasiKamar.id },
        order: [['createdAt', 'desc']],
      })
      if (
        !hargaKamar ||
        !(
          moment(moment(tanggalCheckIn).add(i, 'days')).isSameOrAfter(
            moment(hargaKamar?.tanggalMulai)
          ) &&
          moment(moment(tanggalCheckIn).add(i, 'days')).isSameOrBefore(
            moment(hargaKamar?.tanggalSelesai)
          )
        )
      ) {
        hargaKamar = await LogHargaDefaultSpesifikasiKamar.findOne({
          where: { SpesifikasiKamarId: spesifikasiKamar.id },
        })
      }
      listReservasi.push({
        tanggalReservasi: moment(new Date(valFromDate))
          .add(i, 'day')
          .locale('id')
          .format('LL'),
        hargaKamar: hargaKamar?.harga,
        MasterSatuan: {
          nama: 'Kamar',
        },
      })
    }
    const result = {
      ...defaultSpesifikasi,
      logHarga,
      kamar: {
        jenisSpesifikasiKamar: spesifikasiKamar.nama,
        listReservasi,
        duration,
      },
    }
    return { data: result }
  }

  // Tidak mengubah data harga di database dan cuma beri response apa yang user inputkan
  public static async editHarga(
    id: string,
    formData: LogHargaDefaultSpesifikasiKamarAttributes
  ) {
    useValidation(schema.editHarga, formData)
    const data: any = await HargaSpesifikasiKamar.findOne({
      where: { SpesifikasiKamarId: id },
      order: [['createdAt', 'desc']],
    })
    data.harga = Number(formData.harga)
    return {
      harga: data.harga,
    }
  }
}

export default InformasiKamarService
