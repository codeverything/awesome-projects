import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { InformasiOrangAttributes } from 'models/informasiorang'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { Transaction } from 'sequelize/types'
import { Request } from 'express'
import { checkHelper } from 'helpers/Common'
import { isString } from 'lodash'
import FileConfiguration from 'controllers/InformasiOrang/fileConfiguration'
import { ConstMasterTipeTamu } from 'constants/index'
import schema from './schema'
import { includingGetAll } from './modelInclude'

const { InformasiOrang } = models

class InformasiOrangService {
  /**
   * Get All Informasi Orang
   */
  public static async getAll(req: Request) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      InformasiOrang,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, includingGetAll)
    )

    const data = await InformasiOrang.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await InformasiOrang.count({
      include: includeCount,
      where: queryFind.where,
    })

    return {
      message: `${total} data has been received.`,
      data,
      total,
    }
  }

  /**
   * Get One Informasi Orang
   */
  public static async getOne(id: string) {
    const data = await InformasiOrang.findByPk(id, { include: includingGetAll })

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Informasi Orang
   */
  public static async create(
    formData: InformasiOrangAttributes | any,
    txn: Transaction
  ) {
    if (formData.dataString) {
      useValidation(schema.create, formData.dataString)
      formData.fileIdentitas = checkHelper(formData.fileIdentitas)
        ? formData.fileIdentitas.path.replace('public', '')
        : null
      formData.fileBuktiMenikah = checkHelper(formData.fileBuktiMenikah)
        ? formData.fileBuktiMenikah.path.replace('public', '')
        : null
    } else {
      useValidation(schema.create, formData)
      formData.fileIdentitas = checkHelper(formData.fileIdentitas)
        ? formData.fileIdentitas.path.replace('public', '')
        : null
      formData.fileBuktiMenikah = checkHelper(formData.fileBuktiMenikah)
        ? formData.fileBuktiMenikah.path.replace('public', '')
        : null
    }

    // filter data yang tidak berguna untuk dihapus
    if (formData.dataString && formData.dataString.blobURLs) {
      delete formData.dataString.blobURLs
      if (
        formData.dataString.fileIdentitas ||
        formData.dataString.fileBuktiMenikah
      ) {
        delete formData.dataString.fileBuktiMenikah
        delete formData.dataString.fileIdentitas
      }
    }
    let data: any
    if (formData.dataString) {
      data = await InformasiOrang.create(
        {
          ...formData.dataString,
          fileIdentitas: formData.fileIdentitas,
          fileBuktiMenikah: formData.fileBuktiMenikah,
        },
        {
          transaction: txn,
        }
      )
    } else {
      data = await InformasiOrang.create(
        {
          ...formData,
          fileIdentitas: formData.fileIdentitas,
          fileBuktiMenikah: formData.fileBuktiMenikah,
        },
        {
          transaction: txn,
        }
      )
    }

    return data
  }

  /**
   * Update Informasi Orang By Id
   */
  public static async update(
    id: string,
    formData: InformasiOrangAttributes | any,
    txn: Transaction
  ) {
    // jika requestnya berasal dari admin informasi orang di akan masuk kebawah
    if (formData.dataString) {
      useValidation(schema.create, formData.dataString)
      if (!isString(formData.fileIdentitas)) {
        formData.fileIdentitas = formData.fileIdentitas.path.replace(
          'public',
          ''
        )
      }
      if (!isString(formData.fileBuktiMenikah)) {
        formData.fileBuktiMenikah = formData.fileBuktiMenikah.path.replace(
          'public',
          ''
        )
      }
      // jika requestnya berasasl reservasi dia akan masuk disini
    } else {
      useValidation(schema.create, formData)
      if (!isString(formData.fileIdentitas) && formData.fileIdentitas) {
        formData.fileIdentitas = formData.fileIdentitas.path.replace(
          'public',
          ''
        )
      }
      if (!isString(formData.fileBuktiMenikah) && formData.fileBuktiMenikah) {
        console.log('bisaaa di menikah')
        formData.fileBuktiMenikah = formData.fileBuktiMenikah.path.replace(
          'public',
          ''
        )
      }
    }
    let data = await this.getOne(id)

    if (data.fileIdentitas && !isString(formData.fileIdentitas)) {
      new FileConfiguration(data.fileIdentitas as any).deleteImage()
    }
    if (data.fileBuktiMenikah && !isString(formData.fileBuktiMenikah)) {
      new FileConfiguration(data.fileBuktiMenikah).deleteImage()
    }

    if (formData.dataString && formData.dataString.blobURLs) {
      delete formData.dataString.blobURLs
      if (
        formData.dataString.fileIdentitas ||
        formData.dataString.fileBuktiMenikah
      ) {
        delete formData.dataString.fileBuktiMenikah
        delete formData.dataString.fileIdentitas
      }
    }

    if (formData.dataString) {
      console.log(formData.dataString, '<<<<< di data string')
      data = await InformasiOrang.create(
        {
          ...formData.dataString,
          fileIdentitas: formData.fileIdentitas,
          fileBuktiMenikah: formData.fileBuktiMenikah,
        },
        {
          transaction: txn,
        }
      )
    } else {
      console.log(formData, '<<<<<< di formData')
      data.update(
        {
          ...formData,
          fileIdentitas: formData.fileIdentitas,
          fileBuktiMenikah: formData.fileBuktiMenikah,
        },
        {
          transaction: txn,
        }
      )
    }
    return data
  }

  /**
   * Delete Informasi Orang By Id
   */
  public static async delete(id: string) {
    const data = await this.getOne(id)
    if (data.fileIdentitas) {
      new FileConfiguration(data.fileIdentitas as any).deleteImage()
    }
    if (data.fileBuktiMenikah) {
      new FileConfiguration(data.fileBuktiMenikah as any).deleteImage()
    }
    await data.destroy()
  }
}

export default InformasiOrangService
