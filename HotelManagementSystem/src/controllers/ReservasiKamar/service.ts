/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import CheckAvailable from 'controllers/CheckAvailable/service'
import moment from 'moment'
import { toInteger, durationCalc } from 'helpers/Common'
import {
  ICreatePerorangan,
  ICheckOut,
  IExtendKamarAttributes,
  ISwapKamar,
} from 'helpers/baseInterface'
import {
  ConstMasterTipePromo,
  ConstMasterStatusKamar,
  ConstStatusCheckKamar,
  ConstMasterStatusPembayaran,
  ConstMasterStatusPemesanan,
  ConstMasterStatusHK,
  ConstMasterStatusTagihan,
  ConstSatuan,
} from 'constants/index'
import { Transaction } from 'sequelize'

import ReservasiListService from 'controllers/ReservasiList/service'
import PromoService from 'controllers/Promo/service'
import ReservasikKamarKamar from 'models/reservasikamar-kamar'
import ReservasiKamarInvoiceTagihan from 'models/reservasikamarinvoicetagihan'
import {
  detailKerusakanInclude,
  dataReservasiKamarInclude,
  reservasiFasilitasTambahanInclude,
} from './modelInclude'
import Utilities from './utilities'
// import schema from './schema

const {
  ItemKamar,
  ReservasiKamarItemKamar,
  ReservasiKamar,
  ReservasiFasilitasTambahan,
  Reservasi,
  Promo,
  Kamar,
  HargaSpesifikasiKamar,
  InvoiceTambahan,
  SpesifikasiKamar,
  MasterStatusCheckKamar,
  LogExtendKamar,
  Linen,
  MasterItemTagihan,
  LogHargaLinen,
  LogHargaItemKamar,
  MasterStatusHK,
  LogKamar,
  LogHargaDefaultSpesifikasiKamar,
  MasterSatuan,
} = models

class ReservasiKamarService {
  public static async getAll(reservasiId: string, req: any) {
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      ReservasiKamar,
      []
    )
    queryFind.where = {
      ReservasiId: reservasiId,
    }

    const data = await ReservasiKamar.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await ReservasiKamar.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  public static async getOne(id: string) {
    const data = await ReservasiKamar.findByPk(id, {
      include: [
        {
          model: SpesifikasiKamar,
        },
      ],
    })
    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    let hargaKamar = await HargaSpesifikasiKamar.findOne({
      where: { SpesifikasiKamarId: data.SpesifikasiKamarId },
      order: [['createdAt', 'desc']],
    })
    if (!hargaKamar) {
      hargaKamar = await LogHargaDefaultSpesifikasiKamar.findOne({
        where: {
          SpesifikasiKamarId: data.SpesifikasiKamarId,
        },
      })
    }
    const reservasiFasilitasTambahan = await ReservasiFasilitasTambahan.findAll(
      {
        where: { ReservasiKamarId: id },
        attributes: { exclude: ['MasterFasilitasTambahanId'] },
        include: reservasiFasilitasTambahanInclude,
      }
    )
    data.dataValues.hargaExtendPerMalam = hargaKamar?.harga
    data.dataValues.ReservasiFasilitasTambahan = reservasiFasilitasTambahan
    // const result = this.checkComplete(data)
    return data
  }

  public static async createPerorangan(
    formData: ICreatePerorangan,
    txn: Transaction
  ) {
    const reservasiKamar: any[] = []
    const reservasiFasilitasTambahan: any[] = []
    const { ReservasiId } = formData
    for (const element in formData.reservasiKamars) {
      const {
        SpesifikasiKamarId,
        // MasterTipeKamarId,
        // MasterTipeKasurId,
        // MasterSpecialRequirementId,
      } = formData.reservasiKamars[element]
      const spesifikasiKamar = await SpesifikasiKamar.findOne({
        where: {
          id: SpesifikasiKamarId,
        },
      })
      const reservasiKamarCreate = await ReservasiKamar.create(
        {
          ...formData.reservasiKamars[element],
          ReservasiId,
          SpesifikasiKamarId: spesifikasiKamar?.id,
          MasterTipeKamarId: spesifikasiKamar?.MasterTipeKamarId,
          MasterTipeKasurId: spesifikasiKamar?.MasterTipeKasurId,
          MasterSpecialRequirementId:
            spesifikasiKamar?.MasterSpecialRequirementId,
        },
        { transaction: txn }
      )
      reservasiKamar.push(reservasiKamarCreate)
    }
    return { reservasiFasilitasTambahan, reservasiKamar }
  }

  public static async create(formData: any) {
    const reservasiKamar = await ReservasiKamar.create(formData)
    const reservasiFasilitasTambahan: any[] = []
    for (const item in formData.ReservasiFasilitasTambahans) {
      const data = await ReservasiFasilitasTambahan.create(
        formData.ReservasiFasilitasTambahans[item]
      )
      reservasiFasilitasTambahan.push(data)
    }
    const data = {
      reservasiKamar,
      reservasiFasilitasTambahan,
    }
    return data
  }

  public static async checkOut(
    ReservasiKamarId: string,
    formData: ICheckOut,
    txn: Transaction
  ) {
    const data: any = await ReservasiKamar.findByPk(ReservasiKamarId, {
      include: [
        {
          model: SpesifikasiKamar,
        },
      ],
    })
    const reservasi = await Reservasi.findByPk(data.ReservasiId, {
      include: [{ model: ReservasiKamar }],
    })
    const reservasiKamarCount = await ReservasiKamar.count({
      where: {
        MasterStatusKamarId: ConstMasterStatusKamar.CHECKED_IN,
        ReservasiId: reservasi?.id,
      },
    })
    await data.update(
      {
        MasterStatusKamarId: ConstMasterStatusKamar.CHECKED_OUT,
        buttonExtend: 'false',
      },
      {
        transaction: txn,
      }
    )
    await Kamar.update(
      {
        MasterStatusKamarId: ConstMasterStatusKamar.CHECKED_OUT,
        MasterStatusHKId: formData.MasterStatusHKId,
        lastUpdate: new Date(),
      },
      {
        where: { id: data.KamarId },
        transaction: txn,
      }
    )
    await LogKamar.create(
      {
        KamarId: data.KamarId,
        MasterStatusHKId: formData.MasterStatusHKId,
      },
      {
        transaction: txn,
      }
    )
    if (reservasiKamarCount - 1 === 0) {
      await reservasi?.update(
        {
          MasterStatusPemesananId: ConstMasterStatusPemesanan.CHECKED_OUT,
        },
        {
          transaction: txn,
        }
      )
    }
    return data
  }

  public static async updateInvoice(
    ReservasiKamarId: string,
    formData: ICheckOut,
    txn: Transaction
  ) {
    const data = await ReservasiKamar.findByPk(ReservasiKamarId, {
      include: [
        {
          model: SpesifikasiKamar,
        },
      ],
    })
    const reservasi = await Reservasi.findByPk(data?.ReservasiId, {
      include: [{ model: ReservasiKamar }],
    })
    const invoice = await ReservasiListService.getDetailInvoice(
      data?.ReservasiId
    )

    if (formData.itemKerusakanKehilangan) {
      for (const item in formData.itemKerusakanKehilangan) {
        const {
          MasterStatusTagihanId,
          id,
          status,
        } = formData.itemKerusakanKehilangan[item]
        let itemBarang: any = await Linen.findByPk(id) // cobas
        let hargaBarang: any
        if (!itemBarang) {
          itemBarang = await ItemKamar.findByPk(id)
          hargaBarang = await LogHargaItemKamar.findOne({
            where: {
              ItemKamarId: itemBarang?.id,
            },
            order: [['createdAt', 'desc']],
          })
        } else {
          hargaBarang = await LogHargaLinen.findOne({
            where: {
              LinenId: itemBarang?.id,
            },
          })
        }
        const itemTagihan = await MasterItemTagihan.create(
          {
            nama: itemBarang?.nama,
            satuan: 'buah',
          },
          {
            transaction: txn,
          }
        )
        if (MasterStatusTagihanId === ConstMasterStatusTagihan.TAGIHKAN) {
          const value = {
            MasterItemTagihanId: itemTagihan.id,
            jumlah: formData.itemKerusakanKehilangan[item].jumlah,
            nilaiHarga: hargaBarang ? hargaBarang?.harga : 0,
            jumlahHarga: hargaBarang
              ? hargaBarang?.harga *
                formData.itemKerusakanKehilangan[item].jumlah
              : 0,
            keterangan: status.nama,
            ReservasiId: reservasi?.id,
          } as any
          await InvoiceTambahan.create(value, {
            transaction: txn,
          })
          await new Utilities(
            toInteger(invoice.balance),
            value.jumlahHarga
          ).updateStatusPembayaran(reservasi, txn)

          await ReservasiKamarItemKamar.update(
            { MasterStatusTagihanId },
            {
              where: {
                ReservasiKamarId,
              },
              transaction: txn,
            }
          )
        }
        await data?.update(
          {
            MasterStatusCheckKamarId: ConstStatusCheckKamar.SUDAH_CHECK,
          },
          {
            transaction: txn,
          }
        )
      }
    }
    return data
  }

  public static async swapKamar(
    id: string,
    formData: ISwapKamar,
    txn: Transaction
  ) {
    const data = await ReservasiKamar.findByPk(id)
    const kamar = await Kamar.findByPk(data?.KamarId)
    const durasi = durationCalc(data?.tanggalCheckIn, data?.tanggalCheckOut)
    await ReservasikKamarKamar.create({
      KamarId: formData.kamar[0].id,
      ReservasiKamarId: data?.id,
    })
    const reservasiKamarInvoiceTagihan = await ReservasiKamarInvoiceTagihan.findAll(
      {
        where: {
          ReservasiKamarId: id,
        },
        order: [['nominal', 'asc']],
      }
    )
    for (let i = 0; i < durasi; i += 1) {
      const findSpecKamar = await HargaSpesifikasiKamar.findAll({
        where: {
          SpesifikasiKamarId: formData.kamar[0].SpesifikasiKamarId,
        },
      })
      let findHargaKamar = findSpecKamar.find((x) =>
        moment(data?.tanggalCheckIn)
          .add(i, 'days')
          .isSameOrAfter(x.tanggalMulai)
      ) as any
      if (!findHargaKamar) {
        findHargaKamar = await LogHargaDefaultSpesifikasiKamar.findOne({
          where: { SpesifikasiKamarId: formData.kamar[0].SpesifikasiKamarId },
        })
      }
      const masterSatuan = await MasterSatuan.findOne({
        where: {
          nama: 'Kamar',
        },
      })
      await InvoiceTambahan.create(
        {
          keterangan:
            findHargaKamar?.harga - reservasiKamarInvoiceTagihan[i].nominal ===
            0
              ? `swap kamar ${kamar?.nomor} menjadi ${formData.kamar[0].nomor}`
              : `Tambahan Tagihan Harga Kamar (swap kamar ${kamar?.nomor} menjadi ${formData.kamar[0].nomor})`,
          ReservasiId: data?.ReservasiId,
          nilaiHarga:
            findHargaKamar?.harga - reservasiKamarInvoiceTagihan[i].nominal,
          jumlah: 1,
          MasterSatuanId: masterSatuan?.id,
          keteranganSwap: `${formData.kamar[0].SpesifikasiKamar.nama} ${moment(
            data?.tanggalCheckIn
          )
            .add(i, 'day')
            .locale('id')
            .format('LL')} (swap)`,
          createdAt: moment().add(i * 2, 'seconds'),
        },
        {
          transaction: txn,
        }
      )
    }

    await kamar?.update(
      {
        MasterStatusHKId: formData.MasterStatusHKId,
        MasterStatusKamarId: ConstMasterStatusKamar.CHECKED_OUT,
      },
      {
        transaction: txn,
        where: {
          id: data?.KamarId,
        },
      }
    )
    await data?.update(
      {
        KamarId: formData.kamar[0].id,
        MasterStatusCheckKamarId: ConstStatusCheckKamar.CHECK,
        SpesifikasiKamarId: formData.kamar[0].SpesifikasiKamarId,
        MasterTipeKasurId: formData.kamar[0].SpesifikasiKamar.MasterTipeKasurId,
        MasterTipeKamarId: formData.kamar[0].SpesifikasiKamar.MasterTipeKamarId,
        MasterSpecialRequirementId:
          formData.kamar[0].SpesifikasiKamar.MasterSpecialRequirementId,
        isSwap: true,
      },
      {
        transaction: txn,
      }
    )
    const kamarSwap = await Kamar.findByPk(formData.kamar[0].id)
    await kamarSwap?.update(
      {
        MasterStatusHKId: ConstMasterStatusHK.OCCUPIED_DIRTY,
        MasterStatusKamarId: ConstMasterStatusKamar.CHECKED_IN,
      },
      { transaction: txn }
    )
    // throw new ResponseError.BadRequest('blok')
    return data
  }

  public static async extendKamar(
    id: string,
    formData: IExtendKamarAttributes,
    txn: Transaction
  ) {
    const { tanggalExtend, hargaExtendPerMalam } = formData
    const data = await ReservasiKamar.findByPk(id)
    const warning = await CheckAvailable.checkAvailable({
      MasterSpecialRequirementId: data?.MasterSpecialRequirementId,
      MasterTipeKamarId: data?.MasterTipeKamarId,
      MasterTipeKasurId: data?.MasterTipeKasurId,
      tanggalCheckIn: data?.tanggalCheckOut,
      tanggalCheckOut: tanggalExtend,
    })
    if (warning.data.detailItem.isAvailable === false) {
      throw new ResponseError.BadRequest('Maaf Kamar Tidak Tersedia')
    }
    if (
      moment(data?.tanggalCheckOut).locale('id').format() >
        moment(tanggalExtend).locale('id').format() ||
      moment(data?.tanggalCheckOut).isSame(moment(tanggalExtend))
    ) {
      throw new ResponseError.BadRequest(
        'Tanggal Tidak boleh kurang dari atau Sama dengan tanggal Check Out awal'
      )
    }

    const logExtendKamarValue: any = {
      tanggalAwalCheckOutAndTanggalAkhirCheckOut: `${moment(
        data?.tanggalCheckOut
      )
        .locale('id')
        .format('ll')} - ${moment(tanggalExtend).locale('id').format('ll')}`,
      ReservasiKamarId: data?.id,
    }

    await LogExtendKamar.create(logExtendKamarValue, {
      transaction: txn,
    })
    const duration = Math.ceil(
      Math.abs(
        moment
          .duration(moment(data?.tanggalCheckOut).diff(moment(tanggalExtend)))
          .asDays()
      )
    )
    data?.update(
      {
        isExtend: 'true',
        tanggalCheckOut: moment(tanggalExtend),
      },
      {
        transaction: txn,
      }
    )
    let totalHargaFasilitasTambahan: number = 0
    if (formData.ReservasiFasilitasTambahan.length > 0) {
      const getHargaFasilitasTambahan = formData.ReservasiFasilitasTambahan.map(
        (x: any) =>
          x.MasterFasilitasTambahan.LogHargaMasterFasilitasTambahan.harga *
          x.jumlah
      )
      totalHargaFasilitasTambahan = getHargaFasilitasTambahan.reduce(
        (a: number, b: number) => a + b
      )
    }
    await Kamar.update(
      { MasterStatusKamarId: ConstMasterStatusKamar.EXTENDED },
      {
        where: { id: data?.KamarId },
        transaction: txn,
      }
    )
    let hargaSpesifikasiKamar = await HargaSpesifikasiKamar.findOne({
      where: { SpesifikasiKamarId: data?.SpesifikasiKamarId },
      order: [['createdAt', 'desc']],
    })
    if (!hargaSpesifikasiKamar) {
      hargaSpesifikasiKamar = await LogHargaDefaultSpesifikasiKamar.findOne({
        where: { SpesifikasiKamarId: data?.SpesifikasiKamarId },
      })
    }
    let totalHarga: number = 0
    let nilaiDiskon: number = 0
    let MasterTipePromoId: string = ''
    let totalPromo: number = 0
    if (formData.promo && formData.promo !== '') {
      const promo = await PromoService.checkPromo(
        {
          promo: formData.promo,
        },
        txn
      )
      await Promo.update(
        {
          sisaKuota: promo.sisaKuota - 1,
        },
        {
          where: {
            id: promo.id,
          },
          transaction: txn,
        }
      )
      nilaiDiskon = promo?.nilai
      MasterTipePromoId = promo.MasterTipePromoId
      if (promo?.MasterTipePromoId === ConstMasterTipePromo.PERSENTASE) {
        // eslint-disable-next-line prettier/prettier
        totalPromo = hargaExtendPerMalam * (promo.nilai / 100)
        // eslint-disable-next-line prettier/prettier
        totalHarga = ((hargaExtendPerMalam + totalHargaFasilitasTambahan) * duration) - totalPromo
      } else if (promo?.MasterTipePromoId === ConstMasterTipePromo.NOMINAL) {
        totalPromo = nilaiDiskon
        // eslint-disable-next-line prettier/prettier
        totalHarga = ((hargaExtendPerMalam + totalHargaFasilitasTambahan) * duration) - promo.nilai
      }
    } else {
      totalHarga =
        (hargaExtendPerMalam + totalHargaFasilitasTambahan) * duration
    }
    const listReservasi = await ReservasiKamar.findAll({
      where: { ReservasiId: data?.ReservasiId },
    })
    const { lastDate } = await this.getLastDate(listReservasi)
    await Reservasi.update(
      {
        tanggalAkhirCheckOut: lastDate,
        MasterStatusPembayaranId: ConstMasterStatusPembayaran.BELUM_LUNAS,
      },
      {
        where: { id: data?.ReservasiId },
        transaction: txn,
      }
    )
    const value = {
      tanggalExtend: moment().locale('id').format('LL'),
      jumlah: duration,
      nilaiHarga: hargaExtendPerMalam + totalHargaFasilitasTambahan,
      HargaSpesifikasiKamarId: hargaSpesifikasiKamar?.id,
      ReservasiExtendKamarId: data?.id,
      jumlahHarga: totalHarga,
      ReservasiId: data?.ReservasiId,
      nilaiDiskon: totalPromo,
      LogHargaDefaultSpesifikasiKamarId: hargaSpesifikasiKamar?.id,
      MasterTipePromoId,
    } as any
    const invoiceTambahan = await InvoiceTambahan.create(value, {
      transaction: txn,
    })
    if (formData.ReservasiFasilitasTambahan) {
      const listFasilitasTambahan: any[] = []
      for (const item in formData.ReservasiFasilitasTambahan) {
        const {
          MasterFasilitasTambahan,
          jumlah,
        } = formData.ReservasiFasilitasTambahan[item]
        listFasilitasTambahan.push(
          `${MasterFasilitasTambahan.JenisFasilitasTambahan.nama}(${jumlah})`
        )
      }
      await invoiceTambahan.update(
        {
          keteranganFasilitasTambahan: listFasilitasTambahan.join(', '),
        },
        {
          transaction: txn,
        }
      )
    }
    await invoiceTambahan.update(
      {
        nilaiDiskon: totalPromo,
      },
      {
        transaction: txn,
      }
    )

    return data
  }

  private static async getLastDate(data: any) {
    const listDate: any[] = []
    data.forEach((element: any) => {
      listDate.push(element.tanggalCheckIn, element.tanggalCheckOut)
    })
    const sortDate = listDate.sort((a, b) => a - b)
    return { lastDate: sortDate[sortDate.length - 1] }
  }

  public static async checkKamar(id: string, txn: Transaction) {
    const data = await ReservasiKamar.findByPk(id, {
      include: [
        {
          model: MasterStatusCheckKamar,
          attributes: ['id', 'nama'],
        },
      ],
    })
    const kamar = await Kamar.findByPk(data?.KamarId)
    await data?.update(
      {
        isExtend: 'false',
        isChecked: 'true',
        MasterStatusCheckKamarId: ConstStatusCheckKamar.SEDANG_CHECK,
      },
      {
        transaction: txn,
      }
    )
    await kamar?.update(
      { MasterStatusHKId: ConstMasterStatusHK.NEED_CHECK },
      {
        transaction: txn,
      }
    )
    await LogKamar.create(
      {
        KamarId: data?.KamarId,
        MasterStatusHKId: ConstMasterStatusHK.NEED_CHECK,
      },
      {
        transaction: txn,
      }
    )

    return data
  }

  public static async detailKamar(id: string) {
    const result = await ReservasiKamar.findByPk(id, {
      include: dataReservasiKamarInclude,
    })
    const reservasi = await ReservasiListService.getOne(result?.ReservasiId)
    const reservasiKamarItem = await ReservasiKamarItemKamar.findAll({
      where: {
        ReservasiKamarId: id,
      },
      include: detailKerusakanInclude,
    })
    const listItem: any[] = []
    for (const item in reservasiKamarItem) {
      if (reservasiKamarItem[item].LinenId) {
        const data = await Linen.findByPk(reservasiKamarItem[item].LinenId)
        listItem.push({
          id: data?.id,
          item: data?.nama,
          jumlah: reservasiKamarItem[item].jumlah,
          status: reservasiKamarItem[item].MasterTagihanKerusakanKehilangan,
          MasterStatusTagihanId: ConstMasterStatusTagihan.TIDAK_TAGIHKAN,
        })
      }
      if (reservasiKamarItem[item].ItemKamarId) {
        const data = await ItemKamar.findByPk(
          reservasiKamarItem[item].ItemKamarId
        )
        listItem.push({
          id: data?.id,
          item: data?.nama,
          jumlah: reservasiKamarItem[item].jumlah,
          status: reservasiKamarItem[item].MasterTagihanKerusakanKehilangan,
          MasterStatusTagihanId: ConstMasterStatusTagihan.TIDAK_TAGIHKAN,
        })
      }
    }
    let isButtonDisabled: boolean = false
    if (
      reservasi.MasterStatusPembayaranId ===
      ConstMasterStatusPembayaran.BELUM_LUNAS
    ) {
      isButtonDisabled = true
    }
    const kamar = await Kamar.findByPk(result?.KamarId, {
      include: [MasterStatusHK],
    })
    const data = {
      id: result?.id,
      nomorKamar: result?.Kamar!.nomor,
      statusKamar: kamar?.MasterStatusHK!.nama,
      listItem,
      isButtonDisabled,
    }
    return data
  }

  public static async deleteKamar(id: string, txn: Transaction) {
    const data = await this.getOne(id)
    const reservasi = await Reservasi.findByPk(data.ReservasiId)
    const invoice = await ReservasiListService.getDetailInvoice(
      data.ReservasiId
    )

    let hargaKamar = await HargaSpesifikasiKamar.findOne({
      where: {
        SpesifikasiKamarId: data?.SpesifikasiKamarId,
      },
      order: [['createdAt', 'desc']],
    })

    if (
      !hargaKamar ||
      moment(moment()).isAfter(moment(hargaKamar?.tanggalSelesai))
    ) {
      hargaKamar = await LogHargaDefaultSpesifikasiKamar.findOne({
        where: { SpesifikasiKamarId: data?.SpesifikasiKamarId },
      })
    }

    await InvoiceTambahan.create({
      keterangan: `Pembatalan Kamar`,
      ReservasiId: data?.ReservasiId,
      nilaiHarga: -hargaKamar?.harga,
      jumlah: durationCalc(data?.tanggalCheckIn, data?.tanggalCheckOut),
      MasterSatuanId: ConstSatuan.MALAM,
      keteranganSwap: `${data?.SpesifikasiKamar!.nama} (Canceled)`,
    })

    await new Utilities(
      toInteger(invoice.balance),
      hargaKamar?.harga
    ).updateStatusPembayaran(reservasi, txn)

    await data.destroy()
  }
}

export default ReservasiKamarService
