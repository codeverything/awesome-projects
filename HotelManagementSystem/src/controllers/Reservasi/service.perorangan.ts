/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { Transaction } from 'sequelize/types'
import { checkHelper, getFirstAndLastDate } from 'helpers/Common'
import InformasiOrangService from 'controllers/InformasiOrang/service'
import {
  ConstMasterTipePembayaran,
  ConstMasterStatusPembayaran,
  ConstMasterJenisPembayaran,
  ConstMasterItemPembayaran,
  ConstMasterTipePromo,
  ConstMasterSourcePemesanan,
} from 'constants/index'
import { sortBy } from 'lodash'

import SpesifikasiKamar from 'models/spesifikasikamar'
import InformasiKamarService from '../CheckAvailable/service'
import ReservasiKamarService from '../ReservasiKamar/service'
import PromoService from '../Promo/service'
import schema from './schema'
import ReservasiCreateService from './service'

const {
  InformasiOrang,
  InvoicePembayaran,
  InvoiceTagihan,
  MasterOTA,
  Promo,
  ReservasiKamarInvoiceTagihan,
} = models

class ReservasiService {
  public static async createReservasi(formData: any, txn: Transaction) {
    const informasiOrang = useValidation(
      schema.informasiOrangSchema,
      formData.dataString.InformasiOrang
    )
    const reservasiKamars = formData.dataString.ReservasiKamars
    const reservasi = useValidation(
      schema.reservasiSchema,
      formData.dataString.Reservasi
    ) as any
    const { detailTagihan } = formData.dataString
    // Informasi Orang Create
    const { firstDate, lastDate } = getFirstAndLastDate(reservasiKamars)
    let availableKamarBySpec: any
    const spesifikasiKamarNama = []
    for (let i = 0; i < reservasiKamars.length; i++) {
      console.log(reservasiKamars[i])
      availableKamarBySpec = await InformasiKamarService.checkAvailable({
        tanggalCheckOut: lastDate,
        tanggalCheckIn: firstDate,
        SpesifikasiKamarId: reservasiKamars[i].SpesifikasiKamarId,
      })
      spesifikasiKamarNama.push(availableKamarBySpec.data.detailItem.nama)
      availableKamarBySpec = availableKamarBySpec.data.detailItem.available
    }
    if (availableKamarBySpec < reservasiKamars.length) {
      throw new ResponseError.BadRequest(
        `Kamar yang tersedia tinggal ${availableKamarBySpec}`
      )
    }
    let informasiOrangCreate: any = await InformasiOrang.findByPk(
      formData.dataString.InformasiOrang.id
    )
    if (!informasiOrangCreate) {
      informasiOrangCreate = await InformasiOrangService.create(
        informasiOrang,
        txn
      )
      formData.fileIdentitas = checkHelper(formData.fileIdentitas)
      formData.fileBuktiMenikah = checkHelper(formData.fileBuktiMenikah)
      if (formData.fileIdentitas && formData.fileBuktiMenikah) {
        await informasiOrangCreate.update(
          {
            fileIdentitas: formData.fileIdentitas.path.replace('public', ''),
            fileBuktiMenikah: formData.fileBuktiMenikah.path.replace(
              'public',
              ''
            ),
          },
          {
            transaction: txn,
          }
        )
      } else if (formData.fileIdentitas) {
        await informasiOrangCreate.update(
          {
            fileIdentitas: formData.fileIdentitas.path.replace('public', ''),
          },
          {
            transaction: txn,
          }
        )
      }
    } else if (informasiOrangCreate) {
      informasiOrangCreate = await InformasiOrangService.update(
        informasiOrangCreate.id,
        {
          ...informasiOrang,
          fileIdentitas: checkHelper(formData.fileIdentitas),
          fileBuktiMenikah: checkHelper(formData.fileBuktiMenikah),
        },
        txn
      )
    }

    const reservasiCreate = await ReservasiCreateService.create(
      {
        ...reservasi,
        tanggalAwalCheckIn: firstDate,
        tanggalAkhirCheckOut: lastDate,
        InformasiOrangId: informasiOrangCreate?.id,
        MasterOTAId: reservasi.namaOTA,
      },
      txn
    )
    const { reservasiKamar } = await ReservasiKamarService.createPerorangan(
      {
        reservasiKamars,
        ReservasiId: reservasiCreate.id,
      },
      txn
    )
    let invoiceTagihanKamar: any
    const coba = sortBy(detailTagihan, 'itemId')
    const idInvoiceTagihanList = []
    for (const item in coba) {
      const spesifikasiKamar = await SpesifikasiKamar.findByPk(
        coba[item].itemId
      )
      if (!spesifikasiKamar) {
        await InvoiceTagihan.create(
          {
            keteranganFasilitasTambahan: coba[item].item,
            nilaiHarga: coba[item].hargaKamar,
            jumlah: coba[item].jumlah,
            satuan: `${coba[item].satuan}`,
            tanggalMenginap: coba[item].tanggalReservasi,
            ReservasiId: reservasiCreate.id,
            jumlahHarga: coba[item].jumlah * coba[item].hargaKamar,
          },
          {
            transaction: txn,
          }
        )
      } else {
        invoiceTagihanKamar = await InvoiceTagihan.create(
          {
            namaSpesifikasiKamar: coba[item].item,
            nilaiHarga: coba[item].hargaKamar,
            jumlah: coba[item].jumlah,
            satuan: `${coba[item].satuan}`,
            tanggalMenginap: coba[item].tanggalReservasi,
            ReservasiId: reservasiCreate.id,
            jumlahHarga: coba[item].jumlah * coba[item].hargaKamar,
          },
          {
            transaction: txn,
          }
        )
        idInvoiceTagihanList.push({
          invoiceTagihanId: invoiceTagihanKamar.id,
          nominal: coba[item].hargaKamar,
        })
      }
    }
    for (const i in reservasiKamar) {
      for (const j in idInvoiceTagihanList) {
        await ReservasiKamarInvoiceTagihan.create({
          InvoiceTagihanId: idInvoiceTagihanList[j].invoiceTagihanId,
          ReservasiKamarId: reservasiKamar[i].id,
          nominal: idInvoiceTagihanList[j].nominal,
        })
      }
    }
    let promoHarga: any
    let hargaPromo: number = 0
    if (reservasi.promo && reservasi.promo !== '') {
      promoHarga = await PromoService.checkPromo(
        {
          promo: reservasi.promo,
        },
        txn
      )
      await reservasiCreate.update(
        { PromoId: promoHarga.id },
        { transaction: txn }
      )
      await Promo.update(
        {
          sisaKuota: promoHarga.sisaKuota - 1,
        },
        {
          where: {
            id: promoHarga.id,
          },
          transaction: txn,
        }
      )
      reservasiCreate.update(
        {
          PromoId: promoHarga.id,
        },
        {
          transaction: txn,
        }
      )
      if (promoHarga.MasterTipePromoId === ConstMasterTipePromo.PERSENTASE) {
        hargaPromo = formData.dataString.totalTagihan * (promoHarga.nilai / 100)
        await invoiceTagihanKamar.update(
          {
            promoNilai: hargaPromo,
            jumlahHarga: invoiceTagihanKamar!.jumlahHarga - hargaPromo,
          },
          {
            transaction: txn,
          }
        )
      }

      if (promoHarga.MasterTipePromoId === ConstMasterTipePromo.NOMINAL) {
        hargaPromo = promoHarga.nilai
        await invoiceTagihanKamar.update(
          {
            promoNilai: hargaPromo,
            jumlahHarga: invoiceTagihanKamar!.jumlahHarga - hargaPromo,
          },
          {
            transaction: txn,
          }
        )
      }
    }
    if (reservasi.JenisPembayaranId === ConstMasterJenisPembayaran.PREPAID) {
      const masterOTA = await MasterOTA.findByPk(
        formData.dataString.Reservasi.namaOTA
      )
      await reservasiCreate.update(
        {
          MasterStatusPembayaranId: ConstMasterStatusPembayaran.LUNAS,
        },
        {
          transaction: txn,
        }
      )
      let value: any
      if (
        reservasi.MasterSourcePemesananId === ConstMasterSourcePemesanan.OTA
      ) {
        value = {
          MasterItemPembayaranId: ConstMasterItemPembayaran.PEMBAYARAN,
          nilai: formData.dataString.totalTagihan - hargaPromo,
          MasterTipePembayaranId: '-',
          keterangan: `OTA ${masterOTA?.nama}`,
          ReservasiId: reservasiCreate.id,
        }
      } else if (
        reservasi.MasterSourcePemesananId === ConstMasterSourcePemesanan.WALK_IN
      ) {
        value = {
          MasterItemPembayaranId: ConstMasterItemPembayaran.PEMBAYARAN,
          nilai: formData.dataString.totalTagihan - hargaPromo,
          MasterTipePembayaranId: '-',
          keterangan: `Walkin Prepaid`,
          ReservasiId: reservasiCreate.id,
        }
      }
      await InvoicePembayaran.create(value, {
        transaction: txn,
      })
    } else if (
      reservasi.downPayment &&
      reservasi.downPayment > 0 &&
      reservasi.JenisPembayaranId === ConstMasterJenisPembayaran.PAY_AT_HOTEL
    ) {
      await reservasiCreate.update(
        {
          MasterStatusPembayaranId: ConstMasterStatusPembayaran.BELUM_LUNAS,
        },
        {
          transaction: txn,
        }
      )
      if (Number(reservasi.downPayment) === formData.dataString.totalTagihan) {
        reservasiCreate.update(
          { MasterStatusPembayaranId: ConstMasterStatusPembayaran.LUNAS },
          {
            transaction: txn,
          }
        )
      } else if (
        Number(reservasi.downPayment) > formData.dataString.totalTagihan
      ) {
        reservasiCreate.update(
          { MasterStatusPembayaranId: ConstMasterStatusPembayaran.REFUND },
          {
            transaction: txn,
          }
        )
      }
      const value = {
        MasterItemPembayaranId: ConstMasterItemPembayaran.PEMBAYARAN,
        nilai: reservasi.downPayment,
        MasterTipePembayaranId: ConstMasterTipePembayaran.CASH,
        keterangan: `DP Kamar`,
        ReservasiId: reservasiCreate.id,
      }
      await InvoicePembayaran.create(value, {
        transaction: txn,
      })
    } else if (reservasi.downPayment === 0) {
      await reservasiCreate.update(
        {
          MasterStatusPembayaranId: ConstMasterStatusPembayaran.BELUM_LUNAS,
        },
        {
          transaction: txn,
        }
      )
    }
    await reservasiCreate.update(
      {
        MasterSourcePemesananId: reservasi.MasterSourcePemesananId,
        MasterJenisPembayaranId: reservasi.JenisPembayaranId,
        totalTagihan:
          formData.dataString.totalTagihan - Number(reservasi.downPayment),
      },
      {
        transaction: txn,
      }
    )
    const data = {
      reservasi: reservasiCreate,
      informasiOrang: informasiOrangCreate,
      reservasiKamar,
    }
    return data
  }
}

export default ReservasiService
