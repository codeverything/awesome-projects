import models from 'models'
import {
  ConstMasterCategory,
  ConstMasterPenghitungan,
  ConstMasterJenisInventory,
} from 'constants/index'
import { IUserData, IUpdateStockAmenity } from 'helpers/baseInterface'
import { Transaction } from 'sequelize'
import useValidation from 'helpers/useValidation'
import { isEqual } from 'lodash'
import schema from './schema'

const { Amenity, LogAmenities, MasterKeterangan, LogInventory } = models

class AmenityHkService {
  public static async updateStockAmenity(
    id: string,
    formData: IUpdateStockAmenity,
    userData: IUserData,
    txn: Transaction
  ) {
    useValidation(schema.updateAmenityStock, formData)
    const data = await Amenity.findByPk(id)
    const masterKeterangan = await MasterKeterangan.findByPk(
      formData.MasterKeteranganId
    )
    // ini buat apabila uuid yang diberikan pengurangan atau penambahan lalu dibuat di logInventory
    if (
      isEqual(formData.MasterPenghitunganId, ConstMasterPenghitungan.PENAMBAHAN)
    ) {
      data?.update(
        { jumlah: data?.jumlah + formData.jumlah },
        { transaction: txn }
      )
      await LogAmenities.create(
        {
          log: 'Penambahan Qty',
          keterangan: `${masterKeterangan?.nama}`,
          jumlah: formData.jumlah,
          namaStaff: userData.nama,
          AmenityId: id,
          MasterCategoryId: ConstMasterCategory.UPDATE_STOCK,
        },
        {
          transaction: txn,
        }
      )
      await LogInventory.create(
        {
          MasterCategoryId: ConstMasterCategory.UPDATE_STOCK,
          MasterJenisInventoryId: ConstMasterJenisInventory.AMENITY,
          jumlah: formData.jumlah,
          keterangan: `${masterKeterangan?.nama}`,
          log: 'Penambahan Qty',
          namaInventory: data?.nama,
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
      data?.update(
        { jumlah: data?.jumlah - formData.jumlah },
        {
          transaction: txn,
        }
      )
      await LogAmenities.create(
        {
          log: 'Pengurangan Qty',
          keterangan: `${masterKeterangan?.nama}`,
          jumlah: formData.jumlah,
          namaStaff: userData.nama,
          AmenityId: id,
          MasterCategoryId: ConstMasterCategory.UPDATE_STOCK,
        },
        {
          transaction: txn,
        }
      )
      await LogInventory.create(
        {
          MasterCategoryId: ConstMasterCategory.UPDATE_STOCK,
          MasterJenisInventoryId: ConstMasterJenisInventory.AMENITY,
          jumlah: formData.jumlah,
          keterangan: `${masterKeterangan?.nama}`,
          log: 'Pengurangan Qty',
          namaInventory: data?.nama,
          penanggungJawab: userData.nama,
        },
        {
          transaction: txn,
        }
      )
    }
    return formData
  }
}

export default AmenityHkService
