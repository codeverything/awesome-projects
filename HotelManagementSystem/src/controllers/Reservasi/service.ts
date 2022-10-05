/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { ReservasiAttributes } from 'models/reservasi'
import { Transaction } from 'sequelize/types'
import { Op } from 'sequelize'
import moment from 'moment'
import { isEqual, isNull } from 'lodash'
import { createInvoice } from 'helpers/Common'
import {
  ConstMasterTipePembayaran,
  ConstMasterStatusPemesanan,
  ConstMasterStatusPembayaran,
  ConstMasterJenisPembayaran,
  ConstMasterItemPembayaran,
  ConstMasterStatusKamar,
  ConstMasterStatusHK,
  ConstMasterJenisJaminan,
} from 'constants/index'
import ReservasiListService from 'controllers/ReservasiList/service'
import {
  ICancelReservasiAttributes,
  ICheckInAttributes,
} from 'helpers/baseInterface'

import schema from './schema'

const {
  InvoicePembayaran,
  InvoiceRefund,
  Reservasi,
  ReservasiKamar,
  Kamar,
  LogKamar,
  ReservasiKamarKamar,
} = models

class ReservasiService {
  public static async create(formData: ReservasiAttributes, txn: Transaction) {
    const {
      tanggalAwalCheckIn,
      tanggalAkhirCheckOut,
      InformasiOrangId,
    } = formData
    const dataa = await Reservasi.findOne({
      order: [['createdAt', 'DESC']],
    })
    const value = { ...formData }
    if (moment().isSame(dataa?.createdAt, 'day') && dataa) {
      const splitNomorInvoice = dataa.nomorInvoice.split('/')
      const noUrut = Number(splitNomorInvoice[splitNomorInvoice.length - 1])
      value.nomorInvoice = createInvoice(noUrut + 1)
    } else {
      value.nomorInvoice = createInvoice(1)
    }
    if (
      isEqual(
        formData.MasterJenisPembayaranId,
        ConstMasterJenisPembayaran.PREPAID
      )
    ) {
      value.MasterStatusPembayaranId = ConstMasterStatusPembayaran.LUNAS
    } else {
      value.MasterStatusPembayaranId = ConstMasterStatusPembayaran.BELUM_LUNAS
    }
    value.tanggalReservasi = new Date()
    value.MasterStatusPemesananId = ConstMasterStatusPemesanan.RESERVED
    const data = await Reservasi.create(
      {
        ...value,
        tanggalAwalCheckIn,
        tanggalAkhirCheckOut,
        InformasiOrangId,
      },
      { transaction: txn }
    )

    return data
  }

  public static async checkIn(
    id: string,
    formData: ICheckInAttributes,
    txn: Transaction
  ) {
    const { tipeRoom } = formData
    const data = await ReservasiListService.getOne(id)
    const invoice = await ReservasiListService.getDetailInvoice(id)
    if (tipeRoom.length === 0)
      throw new ResponseError.BadRequest('Tidak Ada Kamar Yang Dipilih')
    if (tipeRoom.length > data.ReservasiKamars.length) {
      throw new ResponseError.BadRequest(
        'Kamar yang dipilih melebihi jumlah reservasi kamar'
      )
    }
    const dataId: any[] = []
    for (const item in tipeRoom) {
      const reservasiKamar = await ReservasiKamar.findOne({
        where: {
          SpesifikasiKamarId: tipeRoom[item].SpesifikasiKamarId,
          ReservasiId: id,
          id: {
            [Op.notIn]: dataId,
          },
        },
      })
      await ReservasiKamarKamar.create(
        {
          KamarId: tipeRoom[item].id,
          ReservasiKamarId: reservasiKamar?.id,
        },
        { transaction: txn }
      )
      dataId.push(reservasiKamar?.id)
      await reservasiKamar?.update(
        {
          MasterStatusKamarId: ConstMasterStatusKamar.CHECKED_IN,
          KamarId: tipeRoom[item].id,
        },
        {
          transaction: txn,
        }
      )
      await Kamar.update(
        {
          MasterStatusKamarId: ConstMasterStatusKamar.CHECKED_IN,
          MasterStatusHKId: ConstMasterStatusHK.OCCUPIED_DIRTY,
        },
        { where: { id: reservasiKamar?.KamarId }, transaction: txn }
      )
      await LogKamar.create(
        {
          KamarId: reservasiKamar?.KamarId,
          MasterStatusHKId: ConstMasterStatusHK.OCCUPIED_DIRTY,
        },
        {
          transaction: txn,
        }
      )
    }
    if (
      isNull(formData.Jaminan.nilaiDeposit) &&
      isNull(formData.Jaminan.identitas.nomorIdentitas)
    ) {
      throw new ResponseError.BadRequest('Jaminan Hotel Wajib Diisi')
    }
    if (!isNull(formData.Jaminan.nilaiDeposit)) {
      if (invoice.balance + formData.Jaminan.nilaiDeposit === 0) {
        data.update(
          {
            MasterStatusPembayaranId: ConstMasterStatusPembayaran.LUNAS,
          },
          {
            transaction: txn,
          }
        )
      } else if (invoice.balance + formData.Jaminan.nilaiDeposit > 0) {
        data.update(
          {
            MasterStatusPembayaranId: ConstMasterStatusPembayaran.REFUND,
          },
          {
            transaction: txn,
          }
        )
      } else {
        data.update(
          {
            MasterStatusPembayaranId: ConstMasterStatusPembayaran.BELUM_LUNAS,
          },
          {
            transaction: txn,
          }
        )
      }
      data.update(
        {
          MasterJenisJaminanId: ConstMasterJenisJaminan.DEPOSIT,
          nilaiDeposit: formData.Jaminan.nilaiDeposit,
        },
        {
          transaction: txn,
        }
      )
      const value = {
        ReservasiId: id,
        nilai: formData.Jaminan.nilaiDeposit,
        MasterItemPembayaranId: ConstMasterItemPembayaran.DEPOSIT,
        MasterTipePembayaranId: ConstMasterTipePembayaran.CASH,
        keterangan: `Pembayaran Deposit`,
      }
      await InvoicePembayaran.create(value, { transaction: txn })
    } else if (
      formData.Jaminan.identitas.nomorIdentitas ||
      formData.Jaminan.identitas.nomorIdentitas !== ''
    ) {
      data.update(
        {
          MasterTipeIdentitasId:
            formData.Jaminan.identitas.MasterTipeIdentitasId,
          nomorIdentitas: formData.Jaminan.identitas.nomorIdentitas,
        },
        {
          transaction: txn,
        }
      )
    }
    await data.update(
      { MasterStatusPemesananId: ConstMasterStatusPemesanan.CHECKED_IN },
      {
        transaction: txn,
      }
    )
    return data
  }

  public static async cancelReservasi(
    id: string,
    formData: ICancelReservasiAttributes,
    txn: any
  ) {
    const data = await ReservasiListService.getOne(id)
    useValidation(schema.cancelReservasi, formData)
    await InvoiceRefund.create(
      {
        ...formData,
        ReservasiId: data.id,
        MasterTipePembayaranId: ConstMasterTipePembayaran.CASH,
        MasterItemPembayaranId: ConstMasterItemPembayaran.PEMBAYARAN,
      },
      {
        transaction: txn,
      }
    )

    await data.update(
      {
        MasterStatusPembayaranId: ConstMasterStatusPembayaran.VOID,
        MasterStatusPemesananId: ConstMasterStatusPemesanan.CANCELED,
        isSelesai: true,
      },
      {
        transaction: txn,
      }
    )
    return data
  }

  public static async selesaiInvoice(id: string) {
    const data = await Reservasi.findByPk(id)
    data?.update({ isSelesai: 'true' })
    return data
  }

  public static async sendEmail(id: string) {
    const data = await ReservasiListService.getDetailInvoice(id)
    const reservasi = await ReservasiListService.getOne(id)
    const result = {
      data,
      reservasi,
    }
    return result
  }
}

export default ReservasiService
