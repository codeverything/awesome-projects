/* eslint-disable no-param-reassign */
import models from 'models'
import useValidation from 'helpers/useValidation'
import {
  ConstMasterTipePromo,
  ConstMasterStatusPembayaran,
} from 'constants/index'
import { Transaction } from 'sequelize/types'
import { toInteger } from 'helpers/Common'
import { createInvoicePembayaran } from './schema'
import PromoService from '../Promo/service'
import ReservasiListService from '../ReservasiList/service'

const { InvoicePembayaran, InvoiceRefund, InvoiceTambahan, Reservasi } = models

class InvoiceService {
  public static async createInvoiceRefund(
    ReservasiId: string,
    formData: any,
    txn: Transaction
  ) {
    const reservasi = await ReservasiListService.getDetailInvoice(ReservasiId)
    const value = useValidation(createInvoicePembayaran, formData) as any
    const data = await InvoiceRefund.create(
      { ...value, ReservasiId },
      { transaction: txn }
    )
    // Karena reservasi balance berupa string yang memisahkan example: 1.000.000
    if (toInteger(reservasi.balance) - Number(formData.nilai) === 0) {
      await Reservasi.update(
        { MasterStatusPembayaranId: ConstMasterStatusPembayaran.LUNAS },
        {
          where: {
            id: ReservasiId,
          },
          transaction: txn,
        }
      )
    } else if (toInteger(reservasi.balance) - Number(formData.nilai) < 0) {
      await Reservasi.update(
        { MasterStatusPembayaranId: ConstMasterStatusPembayaran.BELUM_LUNAS },
        {
          where: {
            id: ReservasiId,
          },
          transaction: txn,
        }
      )
    }
    return data
  }

  public static async createInvoicePembayaran(
    ReservasiId: string,
    formData: any,
    txn: Transaction
  ) {
    const reservasi = await ReservasiListService.getDetailInvoice(ReservasiId)
    const value = useValidation(createInvoicePembayaran, formData) as any
    const data = await InvoicePembayaran.create(
      { ...value, ReservasiId },
      { transaction: txn }
    )
    // Karena reservasi balance berupa string yang memisahkan example: 1.000.000
    if (toInteger(reservasi.balance) + Number(formData.nilai) === 0) {
      await Reservasi.update(
        { MasterStatusPembayaranId: ConstMasterStatusPembayaran.LUNAS },
        {
          where: {
            id: ReservasiId,
          },
          transaction: txn,
        }
      )
      // Karena reservasi balance berupa string yang memisahkan example: 1.000.000
    } else if (toInteger(reservasi.balance) + Number(formData.nilai) > 0) {
      await Reservasi.update(
        { MasterStatusPembayaranId: ConstMasterStatusPembayaran.REFUND },
        {
          where: {
            id: ReservasiId,
          },
          transaction: txn,
        }
      )
    }
    return data
  }

  public static async createInvoiceTagihan(
    ReservasiId: string,
    formData: any,
    txn: Transaction
  ) {
    const reservasi = await ReservasiListService.getDetailInvoice(ReservasiId)
    if (formData.MasterFasilitasTambahanId) {
      formData.jumlahHarga = formData.nilaiHarga * formData.jumlah
      formData.nilaiDiskon = 0
      if (formData.promo && formData.promo !== '') {
        const promoHarga = await PromoService.checkPromo(
          {
            promo: formData.promo,
            ReservasiId,
          },
          txn
        )
        if (promoHarga.MasterTipePromoId === ConstMasterTipePromo.PERSENTASE) {
          formData.nilaiDiskon = formData.jumlahHarga * (promoHarga.nilai / 100)
        }
        if (promoHarga.MasterTipePromoId === ConstMasterTipePromo.NOMINAL) {
          formData.nilaiDiskon = formData.jumlahHarga * (promoHarga.nilai / 100)
        }
      }
    }

    const data = await InvoiceTambahan.create(
      { ...formData, ReservasiId },
      { transaction: txn }
    )
    if (
      // Karena reservasi balance berupa string yang memisahkan example: 1.000.000
      toInteger(reservasi.balance) - formData.nilaiHarga * formData.jumlah <
      0
    ) {
      await Reservasi.update(
        { MasterStatusPembayaranId: ConstMasterStatusPembayaran.BELUM_LUNAS },
        {
          where: {
            id: ReservasiId,
          },
          transaction: txn,
        }
      )
    }

    return data
  }
}

export default InvoiceService
