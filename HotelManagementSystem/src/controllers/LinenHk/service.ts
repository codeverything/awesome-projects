/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import models from 'models'
import { LogLinenLaundryInstance } from 'models/loglinenlaundry'
import ResponseError from 'modules/Response/ResponseError'
import {
  ConstMasterPenghitungan,
  ConstMasterCategory,
  ConstMasterJenisInventory,
} from 'constants/index'
import {
  IUserData,
  IUpdateLinenAttributes,
  IUpdateLinenLaundryAttributes,
} from 'helpers/baseInterface'
import { Transaction } from 'sequelize'
import useValidation from 'helpers/useValidation'
import { isEqual } from 'lodash'
import schema from './schema'
import { includeLogLaundry } from './modelInclude'

const {
  LogLinenLaundry,
  Linen,
  LogLinen,
  MasterKeterangan,
  VendorLaundry,
  LogInventory,
} = models

class RoomHKService {
  public static async createLinenLaundry(
    formData: LogLinenLaundryInstance,
    userData: IUserData,
    txn: Transaction
  ) {
    useValidation(schema.create, formData)
    const linen = await Linen.findByPk(formData.LinenId)
    const data = await LogLinenLaundry.create(
      {
        ...formData,
        namaStaff: userData.nama,
        nama: `${linen?.nama}`,
        UserId: userData.id,
      },
      {
        transaction: txn,
      }
    )
    const vendorLaundry = await VendorLaundry.findByPk(formData.VendorLaundryId)

    if (formData.keluarKotor) {
      await LogLinen.create(
        {
          activity: `Terima Laundry dari ${vendorLaundry?.nama}`,
          jumlah: formData.keluarKotor,
          LinenId: formData.LinenId,
          namaStaff: userData.nama,
          log: `Keluar (Kotor)`,
          MasterCategoryId: ConstMasterCategory.LAUNDRY,
        },
        {
          transaction: txn,
        }
      )
      await LogInventory.create(
        {
          MasterCategoryId: ConstMasterCategory.LAUNDRY,
          MasterJenisInventoryId: ConstMasterJenisInventory.LINEN,
          jumlah: formData.keluarKotor,
          keterangan: `Kasih Kotor Ke ${vendorLaundry?.nama}`,
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
          activity: `Diambil dari ${vendorLaundry?.nama}`,
          jumlah: formData.masukBersih,
          LinenId: formData.LinenId,
          namaStaff: userData.nama,
          log: `Masuk (Bersih)`,
          MasterCategoryId: ConstMasterCategory.LAUNDRY,
        },
        {
          transaction: txn,
        }
      )
      await LogInventory.create(
        {
          MasterCategoryId: ConstMasterCategory.LAUNDRY,
          MasterJenisInventoryId: ConstMasterJenisInventory.LINEN,
          jumlah: formData.masukBersih,
          keterangan: `Diambil dari ${vendorLaundry?.nama}`,
          log: 'Masuk (Bersih)',
          namaInventory: `${linen?.nama}`,
          penanggungJawab: userData.nama,
        },
        {
          transaction: txn,
        }
      )
    }
    return data
  }

  public static async updateStockLinen(
    id: string,
    formData: IUpdateLinenAttributes,
    userData: IUserData,
    txn: Transaction
  ) {
    useValidation(schema.updateLinenStock, formData)
    const data = await Linen.findByPk(id)
    const masterKeterangan = await MasterKeterangan.findByPk(
      formData.MasterKeteranganId
    )
    if (!data) throw new ResponseError.NotFound('Data Not Found')
    if (
      isEqual(formData.MasterPenghitunganId, ConstMasterPenghitungan.PENAMBAHAN)
    ) {
      await data.update(
        {
          jumlah: data.jumlah + formData.jumlah,
        },
        {
          transaction: txn,
        }
      )
      await LogLinen.create(
        {
          activity: `${masterKeterangan?.nama}`,
          jumlah: formData.jumlah,
          LinenId: id,
          namaStaff: userData.nama,
          log: `Tambah Qty`,
          MasterCategoryId: ConstMasterCategory.UPDATE_STOCK,
        },
        {
          transaction: txn,
        }
      )
      await LogInventory.create(
        {
          MasterCategoryId: ConstMasterCategory.UPDATE_STOCK,
          MasterJenisInventoryId: ConstMasterJenisInventory.LINEN,
          jumlah: formData.jumlah,
          keterangan: `${masterKeterangan?.nama}`,
          log: 'Tambah Qty',
          namaInventory: data.nama,
          penanggungJawab: userData.nama,
        },
        {
          transaction: txn,
        }
      )
    } else if (
      isEqual(
        formData.MasterPenghitunganId,
        ConstMasterPenghitungan.PENGURANGAN
      )
    ) {
      await data.update(
        {
          jumlah: data.jumlah - formData.jumlah,
        },
        {
          transaction: txn,
        }
      )
      await LogLinen.create(
        {
          activity: `${masterKeterangan?.nama}`,
          jumlah: formData.jumlah,
          LinenId: id,
          namaStaff: userData.nama,
          log: `Kurangi Qty`,
          MasterCategoryId: ConstMasterCategory.UPDATE_STOCK,
        },
        {
          transaction: txn,
        }
      )
      await LogInventory.create(
        {
          MasterCategoryId: ConstMasterCategory.UPDATE_STOCK,
          MasterJenisInventoryId: ConstMasterJenisInventory.LINEN,
          jumlah: formData.jumlah,
          keterangan: `${masterKeterangan?.nama}`,
          log: 'Kurangi Qty',
          namaInventory: data.nama,
          penanggungJawab: userData.nama,
        },
        {
          transaction: txn,
        }
      )
    }
    return `Data Linen ${data.nama} berhasil diubah`
  }

  public static async updateLinen(
    id: string,
    formData: IUpdateLinenLaundryAttributes,
    userData: IUserData,
    txn: Transaction
  ) {
    const data = await LogLinenLaundry.findByPk(id, {
      include: includeLogLaundry,
    })
    data?.update(formData || {}, {
      transaction: txn,
    })
    if (formData.masukBersih) {
      await LogLinen.create(
        {
          activity: `Edit ${data?.VendorLaundry.nama}`,
          jumlah: formData.masukBersih,
          LinenId: data?.LinenId,
          namaStaff: userData.nama,
          log: `Edit Stock Masuk bersih Keluar Kotor Laundry`,
          MasterCategoryId: ConstMasterCategory.LAUNDRY,
        },
        {
          transaction: txn,
        }
      )
      await LogInventory.create(
        {
          MasterCategoryId: ConstMasterCategory.LAUNDRY,
          MasterJenisInventoryId: ConstMasterJenisInventory.LINEN,
          jumlah: formData.masukBersih,
          keterangan: `Edit Jumlah Masuk Bersih`,
          log: 'Edit Stock Masuk Bersih dan Keluar Kotor',
          namaInventory: `${data?.Linen.nama}`,
          penanggungJawab: userData.nama,
        },
        {
          transaction: txn,
        }
      )
    } else if (formData.keluarKotor) {
      await LogLinen.create(
        {
          activity: `Edit ${data?.VendorLaundry.nama}`,
          jumlah: formData.keluarKotor,
          LinenId: data?.LinenId,
          namaStaff: userData.nama,
          log: `Edit Stock Masuk bersih Keluar Kotor Laundry`,
          MasterCategoryId: ConstMasterCategory.LAUNDRY,
        },
        {
          transaction: txn,
        }
      )
      await LogInventory.create(
        {
          MasterCategoryId: ConstMasterCategory.LAUNDRY,
          MasterJenisInventoryId: ConstMasterJenisInventory.LINEN,
          jumlah: formData.keluarKotor,
          keterangan: `Edit Stock Jumlah Keluar Kotor`,
          log: 'Edit Stock Masuk Bersih dan Keluar Kotor',
          namaInventory: `${data?.Linen.nama}`,
          penanggungJawab: userData.nama,
        },
        {
          transaction: txn,
        }
      )
    }

    return `Data Linen ${data?.Linen.nama} berhasil diubah`
  }

  public static async deleteLinenLaundry(
    userData: IUserData,
    data: LogLinenLaundryInstance
  ) {
    await LogInventory.create({
      MasterCategoryId: ConstMasterCategory.LAUNDRY,
      MasterJenisInventoryId: ConstMasterJenisInventory.LINEN,
      keterangan: `Hapus Laundry dari ${data.VendorLaundry.nama}`,
      log: 'Delete Laundry',
      namaInventory: `${data?.Linen.nama}`,
      penanggungJawab: userData.nama,
    })
    await data.destroy()
    return `Data Berhasil Dihapus`
  }
}
export default RoomHKService
