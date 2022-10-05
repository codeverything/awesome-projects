/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import { Transaction } from 'sequelize/types'
import { sum, isEqual, subtract, sortBy } from 'lodash'
import { checkHelper, getFirstAndLastDate } from 'helpers/Common'
import {
  ConstMasterSourcePemesanan,
  ConstMasterItemPembayaran,
  ConstMasterTipePromo,
  ConstMasterJenisPembayaran,
  ConstMasterStatusPembayaran,
  ConstMasterTipePembayaran,
  ConstMasterTipeTamu,
} from 'constants/index'
import InformasiOrangService from 'controllers/InformasiOrang/service'
import PerusahaanService from 'controllers/InformasiCorporate/service'
import PromoService from 'controllers/Promo/service'
import InformasiKamarService from '../CheckAvailable/service'
import ReservasiMainService from './service'
import ReservasiKamarService from '../ReservasiKamar/service'

const {
  InvoiceTagihan,
  Perusahaan,
  InformasiOrang,
  MasterOTA,
  Promo,
  InvoicePembayaran,
  SpesifikasiKamar,
  ReservasiKamarInvoiceTagihan,
} = models

class ReservasiService {
  // Ini masih WIP

  public static async createReservasi(formData: any, txn: Transaction) {
    const {
      Perusahaan: Perusahaans,
      InformasiOrang: InformasiOrangs,
      Reservasi: Reservasis,
      detailTagihan,
      ReservasiKamars,
    } = formData.dataString
    const { firstDate, lastDate } = getFirstAndLastDate(ReservasiKamars)
    let availableKamarBySpec: any
    const spesifikasiKamarNama = []
    for (let i = 0; i < ReservasiKamars.length; i += 1) {
      availableKamarBySpec = await InformasiKamarService.checkAvailable({
        tanggalCheckOut: lastDate,
        tanggalCheckIn: firstDate,
        SpesifikasiKamarId: ReservasiKamars[i].SpesifikasiKamarId,
      })
      spesifikasiKamarNama.push(availableKamarBySpec.data.detailItem.nama)
      availableKamarBySpec = availableKamarBySpec.data.detailItem.available
    }

    if (availableKamarBySpec < ReservasiKamars.length) {
      throw new ResponseError.BadRequest(
        `Kamar yang tersedia tinggal ${availableKamarBySpec}`
      )
    }

    let informasiOrangCreate = await InformasiOrang.findByPk(InformasiOrangs.id)
    let perusahaanCreate = await Perusahaan.findByPk(Perusahaans.id)
    if (!informasiOrangCreate) {
      informasiOrangCreate = await InformasiOrangService.create(
        InformasiOrangs,
        txn
      )
      formData.fileIdentitas = checkHelper(formData.fileIdentitas)
      if (formData.fileIdentitas) {
        await informasiOrangCreate?.update(
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
          ...InformasiOrangs,
          MasterTipeTamuId: informasiOrangCreate.MasterTipeTamuId,
          fileIdentitas: checkHelper(formData.fileIdentitas),
          fileBuktiMenikah: checkHelper(formData.fileBuktiMenikah),
        },
        txn
      )
    }
    if (!perusahaanCreate) {
      perusahaanCreate = await PerusahaanService.create(Perusahaans, txn)
    } else {
      perusahaanCreate = await PerusahaanService.update(
        perusahaanCreate.id,
        Perusahaans,
        txn
      )
    }
    await informasiOrangCreate?.update(
      { PerusahaanId: perusahaanCreate.id },
      { transaction: txn }
    )
    await perusahaanCreate.update(
      {
        InformasiOrangId: informasiOrangCreate?.id,
      },
      {
        transaction: txn,
      }
    )
    const reservasiCreate = await ReservasiMainService.create(
      {
        ...Reservasis,
        // MasterTipeTamuId: InformasiOrangs.MasterTipeTamuId,
        tanggalAwalCheckIn: firstDate,
        tanggalAkhirCheckOut: lastDate,
        InformasiOrangId: informasiOrangCreate?.id,
        PerusahaanId: perusahaanCreate.id,
        MasterOTAId: Reservasis.namaOTA,
      },
      txn
    )
    const { reservasiKamar } = await ReservasiKamarService.createPerorangan(
      {
        reservasiKamars: ReservasiKamars,
        ReservasiId: reservasiCreate.id,
      },
      txn
    )
    let invoiceTagihanKamar: any
    const jumlahHarga = []
    const idInvoiceTagihanList = []
    const coba = sortBy(detailTagihan, 'itemId')
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
        jumlahHarga.push(coba[item].hargaKamar)
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
    if (Reservasis.promo && Reservasis.promo !== '') {
      promoHarga = await PromoService.checkPromo(
        {
          promo: Reservasis.promo,
        },
        txn
      )
      await reservasiCreate.update(
        { PromoId: promoHarga.id },
        { transaction: txn }
      )
      await Promo.update(
        {
          sisaKuota: subtract(promoHarga.sisaKuota, 1),
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
      if (
        isEqual(promoHarga.MasterTipePromoId, ConstMasterTipePromo.PERSENTASE)
      ) {
        hargaPromo = formData.dataString.totalTagihan * (promoHarga.nilai / 100)
        await invoiceTagihanKamar.update(
          {
            promoNilai: hargaPromo,
            jumlahHarga: invoiceTagihanKamar.jumlahHarga - hargaPromo,
          },
          {
            transaction: txn,
          }
        )
      }
      if (isEqual(promoHarga.MasterTipePromoId, ConstMasterTipePromo.NOMINAL)) {
        hargaPromo = promoHarga.nilai
        await invoiceTagihanKamar.update(
          {
            promoNilai: hargaPromo,
            jumlahHarga: subtract(invoiceTagihanKamar.jumlahHarga, hargaPromo),
          },
          {
            transaction: txn,
          }
        )
      }
    }
    if (
      isEqual(Reservasis.JenisPembayaranId, ConstMasterJenisPembayaran.PREPAID)
    ) {
      const masterOTA = await MasterOTA.findByPk(Reservasis.namaOTA)
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
        isEqual(
          Reservasis.MasterSourcePemesananId,
          ConstMasterSourcePemesanan.OTA
        )
      ) {
        value = {
          MasterItemPembayaranId: ConstMasterItemPembayaran.PEMBAYARAN,
          nilai: formData.dataString.totalTagihan - hargaPromo,
          MasterTipePembayaranId: '-',
          keterangan: `OTA ${masterOTA?.nama}`,
          ReservasiId: reservasiCreate.id,
        }
      } else if (
        isEqual(
          Reservasis.MasterSourcePemesananId,
          ConstMasterSourcePemesanan.WALK_IN
        )
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
      Reservasis.downPayment &&
      Reservasis.downPayment > 0 &&
      isEqual(
        Reservasis.JenisPembayaranId,
        ConstMasterJenisPembayaran.PAY_AT_HOTEL
      )
    ) {
      await reservasiCreate.update(
        {
          MasterStatusPembayaranId: ConstMasterStatusPembayaran.BELUM_LUNAS,
        },
        {
          transaction: txn,
        }
      )
      if (Number(Reservasis.downPayment) === sum(jumlahHarga)) {
        reservasiCreate.update(
          { MasterStatusPembayaranId: ConstMasterStatusPembayaran.LUNAS },
          {
            transaction: txn,
          }
        )
      } else if (Number(Reservasis.downPayment) > sum(jumlahHarga)) {
        reservasiCreate.update(
          { MasterStatusPembayaranId: ConstMasterStatusPembayaran.REFUND },
          {
            transaction: txn,
          }
        )
      }
      const value = {
        MasterItemPembayaranId: ConstMasterItemPembayaran.PEMBAYARAN,
        nilai: Reservasis.downPayment,
        MasterTipePembayaranId: ConstMasterTipePembayaran.CASH,
        keterangan: `DP Kamar`,
        ReservasiId: reservasiCreate.id,
      }
      await InvoicePembayaran.create(value, {
        transaction: txn,
      })
    } else if (Reservasis.downPayment === 0) {
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
        MasterSourcePemesananId: Reservasis.MasterSourcePemesananId,
        MasterTipeTamuId: ConstMasterTipeTamu.COORPORATE,
        MasterJenisPembayaranId: Reservasis.JenisPembayaranId,
        totalTagihan: subtract(
          sum(jumlahHarga),
          Number(Reservasis.downPayment)
        ),
      },
      {
        transaction: txn,
      }
    )
    return 'Data Berhasil Ditambah'
  }
}

export default ReservasiService
