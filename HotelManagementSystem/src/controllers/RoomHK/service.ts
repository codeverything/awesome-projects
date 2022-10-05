/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import {
  ConstMasterStatusHK,
  ConstMasterStatusLostAndFound,
  ConstMasterKehilanganKerusakan,
  ConstStatusCheckKamar,
  ConstTipeItem,
  ConstMasterCategory,
  ConstMasterJenisInventory,
} from 'constants/index'
import ReservasiKamar from 'models/reservasikamar'
import moment from 'moment'
import { formatTanggalAndTime } from 'helpers/Common'
import { Transaction } from 'sequelize'
import { LogLinenSupplyChainAttributes } from 'models/loglinensupplychain'
import { LostAndFoundAttributes } from 'models/lostandfound'

import {
  IAmenitySupply,
  IKerusakanKehilanganItem,
  ILinenSupplyChain,
  IUserData,
} from 'helpers/baseInterface'
import useValidation from 'helpers/useValidation'
import { capitalize } from 'lodash'
import { checkTanggal } from './helper'
import { includeGetOne } from './modelInclude'
import schema from './schema'

const {
  Kamar,
  Linen,
  ReservasiKamarItemKamar,
  LogKamar,
  Reservasi,
  LostAndFound,
  LogAmenities,
  LogChecker,
  LogLostAndFound,
  LinenSupplyChain,
  LogLinenSupplyChain,
  AmenitySupply,
  ItemKamar,
  InformasiOrang,
  Amenity,
  LogLinen,
  LogInventory,
  ReservasiKamarKamar,
} = models

class RoomHKService {
  public static async getOne(id: string, req: Request) {
    const dataKamar = await Kamar.findByPk(id, { include: includeGetOne })
    const data = {
      id: dataKamar?.id,
      room: `${dataKamar?.nomor}, ${dataKamar?.SpesifikasiKamar.nama}`,
      specKamarId: dataKamar?.SpesifikasiKamarId,
      dateAndTime: `${checkTanggal(dataKamar, 'LL')} | ${checkTanggal(
        dataKamar,
        'HH.mm'
      )}`,
    }
    return data
  }

  /**
   * static async kerusakanKehilanganSave
   */
  public static async kerusakanKehilanganSave(
    id: string,
    formData: IKerusakanKehilanganItem,
    userData: IUserData
  ) {
    const data = await Kamar.findByPk(id, { include: includeGetOne })
    const reservasiKamar = await ReservasiKamar.findOne({
      order: [['updatedAt', 'desc']],
      where: {
        KamarId: id,
      },
    })
    if (formData.linen) {
      formData.linen.forEach(async (item: any) => {
        const linen = await Linen.findByPk(item.barangId)
        const value = {
          KamarId: id,
          ReservasiKamarId: reservasiKamar?.id,
          LinenId: item.barangId,
          MasterTagihanKerusakanKehilanganId:
            item.MasterTagihanKerusakanKehilanganId,
          jumlah: item.jumlah,
          nama: linen?.nama,
          MasterTipeBarangId: ConstTipeItem.LINEN,
        } as any
        const itemKamar = await ReservasiKamarItemKamar.create(value)
        await LogChecker.create({
          KamarId: id,
          nama: userData.nama,
          ReservasiKamarId: reservasiKamar?.id,
          ReservasiKamarItemKamarId: itemKamar.id,
        })
        if (
          item.MasterTagihanKerusakanKehilanganId ===
          ConstMasterKehilanganKerusakan.HILANG
        ) {
          const linenSupply = await LinenSupplyChain.create({
            LinenId: item.barangId,
            KamarId: id,
            hilangAwal: item.jumlah,
            ReservasiKamarId: reservasiKamar?.id,
          })
          await LogLinenSupplyChain.create({
            namaStaff: userData.nama,
            ReservasiKamarId: reservasiKamar?.id,
            KamarId: id,
            Linen: linen,
            LinenId: item.barangId,
            hilangAwal: item.jumlah,
            LinenSupplyChainId: linenSupply?.id,
          })
        } else if (
          item.MasterTagihanKerusakanKehilanganId ===
          ConstMasterKehilanganKerusakan.RUSAK
        ) {
          const linenSupply = await LinenSupplyChain.create({
            LinenId: item.barangId,
            KamarId: id,
            rusakAwal: item.jumlah,
            ReservasiKamarId: reservasiKamar?.id,
          })
          await LogLinenSupplyChain.create({
            namaStaff: userData.nama,
            ReservasiKamarId: reservasiKamar?.id,
            KamarId: id,
            Linen: linen,
            LinenId: item.barangId,
            rusakAwal: item.jumlah,
            LinenSupplyChainId: linenSupply?.id,
          })
        }
      })
    }
    if (formData.nonLinen) {
      formData.nonLinen.forEach(async (item: any) => {
        const itemKamar = await ItemKamar.findByPk(item.barangId)
        const value = {
          KamarId: id,
          ReservasiKamarId: reservasiKamar?.id,
          ItemKamarId: item.barangId,
          MasterTagihanKerusakanKehilanganId:
            item.MasterTagihanKerusakanKehilanganId,
          jumlah: item.jumlah,
          nama: itemKamar?.nama,
          MasterTipeBarangId: ConstTipeItem.NON_LINEN,
        } as any
        const nonLinen = await ReservasiKamarItemKamar.create(value)
        await LogChecker.create({
          KamarId: id,
          nama: userData.nama,
          ReservasiKamarId: reservasiKamar?.id,
          ReservasiKamarItemKamarId: nonLinen.id,
        })
      })
    }
    await data?.update({
      lastUpdate: new Date(),
      MasterStatusHKId: ConstMasterStatusHK.CHECKED,
    })
    if (!formData.linen && !formData.nonLinen) {
      await ReservasiKamar.update(
        {
          MasterStatusCheckKamarId: ConstStatusCheckKamar.SUDAH_CHECK,
        },
        {
          where: {
            id: reservasiKamar?.id,
          },
        }
      )
    } else if (formData.linen || formData.nonLinen) {
      await ReservasiKamar.update(
        {
          MasterStatusCheckKamarId: ConstStatusCheckKamar.TAGIHAN,
        },
        {
          where: {
            id: reservasiKamar?.id,
          },
        }
      )
    }
    await LogKamar.create({
      KamarId: id,
      MasterStatusHKId: ConstMasterStatusHK.CHECKED,
    })
    return 'success'
  }

  public static async createLinenSupply(
    formData: ILinenSupplyChain,
    userData: IUserData
  ) {
    await LinenSupplyChain.create({
      ...formData,
    })
    const reservasiKamar = await ReservasiKamar.findOne({
      where: {
        KamarId: formData.KamarId,
      },
      order: [['createdAt', 'desc']],
    })
    await LogLinenSupplyChain.create({
      ...formData,
      namaStaff: userData.nama,
      ReservasiKamarId: reservasiKamar?.id,
    })
    return 'sukses menambah data'
  }

  public static async updateLinenSupply(
    id: string,
    formData: LogLinenSupplyChainAttributes,
    txn: Transaction,
    userData: IUserData
  ) {
    const data = await LinenSupplyChain.findByPk(id)
    if (!data) throw new ResponseError.NotFound('Data Tidak Ditemukan')
    const reservasiKamar = await ReservasiKamar.findOne({
      where: {
        KamarId: formData.KamarId,
      },
      order: [['createdAt', 'desc']],
    })
    const linen = await Linen.findByPk(data.LinenId)
    const kamar = await Kamar.findByPk(reservasiKamar?.KamarId)
    if (kamar?.MasterStatusHKId === ConstMasterStatusHK.AVAILABLE_CLEAN) {
      throw new ResponseError.BadRequest(
        'tidak bisa diganti karena status kamar available Clean'
      )
    }
    delete formData.id
    await data.update(
      { ...formData },
      {
        transaction: txn,
      }
    )
    const logLinen = await LogLinenSupplyChain.findOne({
      where: {
        LinenSupplyChainId: id,
      },
    })
    if (logLinen) {
      await logLinen.update(
        {
          ...formData,
          namaStaff: userData.nama,
          ReservasiKamarId: reservasiKamar?.id,
          LinenSupplyChainId: id,
        },
        {
          transaction: txn,
        }
      )
    } else {
      await LogLinenSupplyChain.create(
        {
          ...formData,
          namaStaff: userData.nama,
          ReservasiKamarId: reservasiKamar?.id,
          LinenSupplyChainId: id,
        },
        {
          transaction: txn,
        }
      )
    }

    if (formData.keluarKotor) {
      await LogLinen.create(
        {
          activity: `Kotor dari kamar ${kamar?.nomor}`,
          jumlah: formData.keluarKotor,
          LinenId: data.LinenId,
          namaStaff: userData.nama,
          log: `Keluar (Kotor)`,
          MasterCategoryId: ConstMasterCategory.BERSIH_KAMAR,
        },
        {
          transaction: txn,
        }
      )
      await LogInventory.create(
        {
          MasterCategoryId: ConstMasterCategory.BERSIH_KAMAR,
          MasterJenisInventoryId: ConstMasterJenisInventory.LINEN,
          jumlah: formData.keluarKotor,
          keterangan: `Kotor dari kamar ${kamar?.nomor}`,
          log: 'Keluar (Kotor)',
          namaInventory: `${linen?.nama}`,
          penanggungJawab: userData.nama,
        },
        {
          transaction: txn,
        }
      )
    }
    if (formData.masukBersih) {
      await LogLinen.create(
        {
          activity: `Penggunaan pada Kamar ${kamar?.nomor}`,
          jumlah: formData.masukBersih,
          LinenId: data.LinenId,
          namaStaff: userData.nama,
          log: `Masuk (Bersih)`,
          MasterCategoryId: ConstMasterCategory.BERSIH_KAMAR,
        },
        {
          transaction: txn,
        }
      )
      await LogInventory.create(
        {
          MasterCategoryId: ConstMasterCategory.BERSIH_KAMAR,
          MasterJenisInventoryId: ConstMasterJenisInventory.LINEN,
          jumlah: formData.masukBersih,
          keterangan: `Penggunaan pada Kamar ${kamar?.nomor}`,
          log: 'Masuk (Bersih)',
          namaInventory: `${linen?.nama}`,
          penanggungJawab: userData.nama,
        },
        {
          transaction: txn,
        }
      )
    }
    if (formData.hilangAkhir) {
      await LogLinen.create(
        {
          activity: `Hilang dari Kamar ${kamar?.nomor}`,
          jumlah: formData.hilangAkhir,
          LinenId: data.LinenId,
          namaStaff: userData.nama,
          log: `Hilang`,
          MasterCategoryId: ConstMasterCategory.BERSIH_KAMAR,
        },
        {
          transaction: txn,
        }
      )
      await LogInventory.create(
        {
          MasterCategoryId: ConstMasterCategory.BERSIH_KAMAR,
          MasterJenisInventoryId: ConstMasterJenisInventory.LINEN,
          jumlah: formData.hilangAkhir,
          keterangan: `Hilang dari Kamar ${kamar?.nomor}`,
          log: 'Hilang',
          namaInventory: `${linen?.nama}`,
          penanggungJawab: userData.nama,
        },
        {
          transaction: txn,
        }
      )
    }
    if (formData.rusakAkhir) {
      await LogLinen.create(
        {
          activity: `Rusak dari Kamar ${kamar?.nomor}`,
          jumlah: formData.rusakAkhir,
          LinenId: data.LinenId,
          namaStaff: userData.nama,
          log: `Rusak`,
          MasterCategoryId: ConstMasterCategory.BERSIH_KAMAR,
        },
        {
          transaction: txn,
        }
      )
      await LogInventory.create(
        {
          MasterCategoryId: ConstMasterCategory.BERSIH_KAMAR,
          MasterJenisInventoryId: ConstMasterJenisInventory.LINEN,
          jumlah: formData.rusakAkhir,
          keterangan: `Rusak dari Kamar ${kamar?.nomor}`,
          log: 'Rusak',
          namaInventory: `${linen?.nama}`,
          penanggungJawab: userData.nama,
        },
        {
          transaction: txn,
        }
      )
    }

    return 'sukses merubah data'
  }

  public static async createAmenity(
    formData: IAmenitySupply,
    userData: IUserData,
    txn: Transaction
  ) {
    useValidation(schema.createAmenity, formData)
    const reservasiKamarKamar = await ReservasiKamarKamar.findOne({
      where: {
        KamarId: formData.KamarId,
      },
      order: [['createdAt', 'desc']],
    })

    const data = await AmenitySupply.create(
      {
        ...formData,
        lastUpdate: `${userData.nama} (${formatTanggalAndTime(moment())})`,
        ReservasiKamarId: reservasiKamarKamar?.ReservasiKamarId,
        UserId: userData.id,
      },
      {
        transaction: txn,
      }
    )
    const amenity = await Amenity.findByPk(formData.AmenityId)

    if (formData.jumlah > amenity?.jumlah) {
      throw new ResponseError.BadRequest(
        `Jumlah yang dimasukkan tidak boleh melebihi total Amenities total: ${amenity?.jumlah}`
      )
    }
    await amenity?.update(
      { jumlah: amenity?.jumlah - formData.jumlah },
      { transaction: txn }
    )
    const kamar = await Kamar.findByPk(data.KamarId)
    await LogAmenities.create(
      {
        AmenityId: data.AmenityId,
        AmenitySupplyId: data.id,
        KamarId: data.KamarId,
        ReservasiKamarId: reservasiKamarKamar?.id,
        jumlah: data.jumlah,
        namaStaff: userData.nama,
        log: `Penggunaan Amenities ${amenity?.nama} pada kamar ${kamar?.nomor} `,
        keterangan: '-',
        MasterCategoryId: ConstMasterCategory.BERSIH_KAMAR,
      },
      { transaction: txn }
    )
    await LogInventory.create(
      {
        MasterCategoryId: ConstMasterCategory.BERSIH_KAMAR,
        MasterJenisInventoryId: ConstMasterJenisInventory.AMENITY,
        jumlah: formData.jumlah,
        keterangan: `-`,
        log: `Penggunaan Amenities ${amenity?.nama} pada Kamar ${kamar?.nomor}`,
        namaInventory: `${amenity?.nama}`,
        penanggungJawab: userData.nama,
      },
      {
        transaction: txn,
      }
    )
    return data
  }

  public static async updateAmenities(
    id: string,
    formData: IAmenitySupply,
    userData: IUserData,
    txn: Transaction
  ) {
    useValidation(schema.createAmenity, formData)
    const data = await AmenitySupply.findOne({
      where: {
        id,
      },
    })
    const amenity = await Amenity.findByPk(data?.AmenityId)
    const kamar = await Kamar.findByPk(data?.KamarId)
    if (formData.jumlah > amenity?.jumlah + data?.jumlah) {
      throw new ResponseError.BadRequest(
        `Jumlah yang dimasukkan tidak boleh melebihi total Amenities.
        Amenities: ${amenity?.jumlah + data?.jumlah}`
      )
    }
    await amenity?.update(
      {
        jumlah: amenity.jumlah + data?.jumlah - formData.jumlah,
      },
      {
        transaction: txn,
      }
    )
    await data?.update(
      {
        ...formData,
        lastUpdate: `${userData.nama} (${formatTanggalAndTime(moment())})`,
      },
      {
        transaction: txn,
      }
    )
    await LogAmenities.create(
      {
        namaStaff: userData.nama,
        jumlah: formData.jumlah,
        AmenityId: formData.AmenityId,
        KamarId: id,
        ReservasiKamarId: data?.ReservasiKamarId,
        AmenitySupplyId: id,
        log: `Edit`,
        keterangan: `Edit Jumlah Penggunaan Amenities ${amenity?.nama} pada kamar ${kamar?.nomor}`,
        MasterCategoryId: ConstMasterCategory.BERSIH_KAMAR,
      },
      {
        transaction: txn,
      }
    )
    await LogInventory.create(
      {
        MasterCategoryId: ConstMasterCategory.BERSIH_KAMAR,
        MasterJenisInventoryId: ConstMasterJenisInventory.AMENITY,
        jumlah: formData.jumlah,
        keterangan: `-`,
        log: `Edit jumlah Amenities ${amenity?.nama} di kamar ${kamar?.nomor}`,
        namaInventory: `${amenity?.nama}`,
        penanggungJawab: userData.nama,
      },
      {
        transaction: txn,
      }
    )

    return 'sukses menambah data'
  }

  public static async deleteAmenities(id: string, userData: IUserData) {
    const data = await AmenitySupply.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Amenity,
        },
      ],
    })
    const amenity = await Amenity.findByPk(data?.AmenityId)
    await amenity?.update({ jumlah: amenity.jumlah + data?.jumlah })
    const reservasiKamar = await ReservasiKamar.findOne({
      where: {
        KamarId: data?.KamarId,
      },
      order: [['createdAt', 'desc']],
    })
    const kamar = await Kamar.findByPk(data?.KamarId)
    await LogAmenities.create({
      AmenityId: data?.AmenityId,
      KamarId: data?.KamarId,
      ReservasiKamarId: reservasiKamar?.id,
      jumlah: data?.jumlah,
      namaStaff: userData.nama,
      log: `Hapus Amenities ${data?.Amenity?.nama} pada kamar ${kamar?.nomor}`,
      keterangan: '-',
      MasterCategoryId: ConstMasterCategory.BERSIH_KAMAR,
    })
    await LogInventory.create({
      MasterCategoryId: ConstMasterCategory.BERSIH_KAMAR,
      MasterJenisInventoryId: ConstMasterJenisInventory.AMENITY,
      jumlah: data?.jumlah,
      keterangan: `-`,
      log: `Hapus Amenities ${data?.Amenity?.nama} pada kamar ${kamar?.nomor}`,
      namaInventory: `${data?.Amenity?.nama}`,
      penanggungJawab: userData.nama,
    })
    if (!data) throw new ResponseError.NotFound('Data Tidak Ditemukan')
    data.destroy()
    return 'data berhasil dihapus'
  }

  public static async deleteLostAndFound(id: string, userData: IUserData) {
    const data = await LostAndFound.findOne({
      where: {
        id,
      },
    })
    const reservasiKamar = await ReservasiKamar.findOne({
      where: {
        KamarId: data?.KamarId,
      },
      order: [['createdAt', 'desc']],
    })
    if (!data) throw new ResponseError.NotFound('Data Tidak Ditemukan')
    await LogLostAndFound.create({
      KamarId: data.KamarId,
      ReservasiKamarId: reservasiKamar?.id,
      jumlah: data.jumlah,
    })
    data.destroy()
    return 'data berhasil dihapus'
  }

  public static async createLostAndFound(
    formData: LostAndFoundAttributes,
    userData: IUserData,
    txn: Transaction
  ) {
    useValidation(schema.createLostAndFound, formData)
    const reservasiKamarKamar = await ReservasiKamarKamar.findOne({
      where: {
        KamarId: formData.KamarId,
      },
      order: [['createdAt', 'desc']],
    })
    let reservasiKamar: any
    if (!reservasiKamarKamar) {
      reservasiKamar = await ReservasiKamar.findOne({
        where: {
          KamarId: formData.KamarId,
        },
        order: [['createdAt', 'desc']],
      })
    } else {
      reservasiKamar = await ReservasiKamar.findOne({
        where: {
          id: reservasiKamarKamar?.ReservasiKamarId,
        },
      })
    }
    if (
      reservasiKamar?.MasterStatusLostAndFoundId ===
      ConstMasterStatusLostAndFound.DIAMBIL
    ) {
      throw new ResponseError.BadRequest(
        'Status Barang Sudah Diambil, tidak bisa menambah lost and found'
      )
    }
    const reservasi = await Reservasi.findOne({
      where: {
        id: reservasiKamar?.ReservasiId,
      },
      include: [
        {
          model: InformasiOrang,
        },
      ],
    })
    formData.namaBarang = capitalize(formData.namaBarang)
    await LostAndFound.create(
      {
        ...formData,
        MasterStatusLostAndFoundId: ConstMasterStatusLostAndFound.TERTINGGAL,
        atasNama: reservasi?.InformasiOrang.nama,
        lastUpdate: `${userData.nama} (${formatTanggalAndTime(moment())})`,
        noHandphone: reservasi?.InformasiOrang.nomorHandphone,
        tanggalCheckOut: reservasi?.tanggalAkhirCheckOut,
        tanggalDitemukan: moment().locale('id').format('ll'),
        ReservasiKamarId: reservasiKamar?.id,
        InformasiOrangId: reservasi?.InformasiOrangId,
        UserId: userData.id,
      },
      {
        transaction: txn,
      }
    )
    const reservasiKamarKamarUpdate = await ReservasiKamarKamar.findOne({
      where: {
        KamarId: formData.KamarId,
        ReservasiKamarId: reservasiKamar.id,
      },
    })
    await reservasiKamarKamarUpdate?.update(
      {
        MasterStatusLostAndFoundId: ConstMasterStatusLostAndFound.TERTINGGAL,
        atasNama: reservasi?.InformasiOrang.nama,
      },
      { transaction: txn }
    )
    await reservasiKamar?.update(
      {
        MasterStatusLostAndFoundId: ConstMasterStatusLostAndFound.TERTINGGAL,
        atasNama: reservasi?.InformasiOrang.nama,
      },
      { transaction: txn }
    )
    await LogLostAndFound.create(
      {
        ...formData,
        MasterStatusLostAndFoundId: ConstMasterStatusLostAndFound.TERTINGGAL,
        atasNama: reservasi?.InformasiOrang.nama,
        lastUpdate: `${userData.nama} (${formatTanggalAndTime(moment())})`,
        noHandphone: reservasi?.InformasiOrang.nomorHandphone,
        tanggalCheckOut: reservasi?.tanggalAkhirCheckOut,
        tanggalDitemukan: moment().locale('id').format('ll'),
        ReservasiKamarId: reservasiKamar?.id,
        InformasiOrangId: reservasi?.InformasiOrangId,
      },
      {
        transaction: txn,
      }
    )
    return 'data berhasil diubah'
  }

  public static async updateLostAndFound(
    id: string,
    formData: LostAndFoundAttributes,
    userData: IUserData,
    txn: Transaction
  ) {
    const data = await LostAndFound.findByPk(id)
    const reservasiKamar = await ReservasiKamar.findOne({
      where: {
        KamarId: data?.KamarId,
      },
      order: [['createdAt', 'desc']],
    })
    const reservasi = await Reservasi.findOne({
      where: {
        id: reservasiKamar?.ReservasiId,
      },
      include: [
        {
          model: InformasiOrang,
        },
      ],
    })
    if (!data) throw new ResponseError.NotFound('Data tidak ditemukan')
    data.update(
      {
        ...formData,
        lastUpdate: `${userData.nama} (${formatTanggalAndTime(moment())})`,
      },
      {
        transaction: txn,
      }
    )
    await LogLostAndFound.create(
      {
        ...formData,
        KamarId: data.KamarId,
        MasterStatusLostAndFoundId: ConstMasterStatusLostAndFound.TERTINGGAL,
        atasNama: reservasi?.InformasiOrang?.nama,
        lastUpdate: `${userData.nama} (${formatTanggalAndTime(moment())})`,
        noHandphone: reservasi?.InformasiOrang?.nomorHandphone,
        tanggalCheckOut: reservasi?.tanggalAkhirCheckOut,
        tanggalDitemukan: moment().locale('id').format('ll'),
      },
      {
        transaction: txn,
      }
    )
    return 'data berhasil diubah'
  }

  public static async updateStatusKamar(
    id: string,
    formData: {
      MasterStatusHKId: string
    },
    txn: Transaction
  ) {
    const data = await Kamar.findByPk(id)
    if (!data) throw new ResponseError.NotFound('Data Tidak Ditemukan')
    if (data.MasterStatusHKId === formData.MasterStatusHKId) {
      throw new ResponseError.BadRequest('Status HK Tidak Boleh Sama')
    }
    await data.update(
      { MasterStatusHKId: formData.MasterStatusHKId },
      {
        transaction: txn,
      }
    )
    await LogKamar.create(
      {
        KamarId: id,
        MasterStatusHKId: formData.MasterStatusHKId,
      },
      {
        transaction: txn,
      }
    )
    return data
  }
}

export default RoomHKService
