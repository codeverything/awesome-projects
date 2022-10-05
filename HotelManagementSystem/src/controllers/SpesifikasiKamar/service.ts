/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { ISpesifikasiKamar } from 'helpers/baseInterface'
import { Transaction } from 'sequelize'
import { includeGetOne, including } from './modelInclude'

import schema from './schema'

const {
  SpesifikasiKamar,
  SpesifikasiKamarItem,
  SpesifikasiKamarLinen,
  LogHargaDefaultSpesifikasiKamar,
} = models

class MasterTipeTamuService {
  /**
   * Get All Role
   */
  public static async getAll(req: any) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      SpesifikasiKamar,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, including)
    )

    const data = await SpesifikasiKamar.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await SpesifikasiKamar.count({
      include: includeCount,
      where: queryFind.where,
    })
    const filteredData: any[] = []
    for (const index in data) {
      const hargaKamar = await LogHargaDefaultSpesifikasiKamar.findOne({
        where: {
          SpesifikasiKamarId: data[index].id,
        },
      })

      filteredData.push({
        id: data[index].id,
        nama: data[index].nama,
        tipeKasur: data[index].MasterTipeKasur,
        tipeKamar: data[index].MasterTipeKamar,
        maxTamu: data[index].maxTamu,
        harga: hargaKamar?.harga || 0,
      })
    }
    return {
      message: `${total} data has been received.`,
      data: filteredData,
      total,
    }
  }

  /**
   * Get One Role
   */
  public static async getOne(id: string) {
    const data = await SpesifikasiKamar.findByPk(id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: includeGetOne,
    })

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Role
   */
  public static async create(formData: ISpesifikasiKamar, txn: Transaction) {
    useValidation(schema.create, formData)
    const { linen, itemKamar } = formData
    const data = await SpesifikasiKamar.create(
      { ...formData },
      {
        transaction: txn,
      }
    )
    await LogHargaDefaultSpesifikasiKamar.create(
      {
        harga: formData.defaultHargaKamar,
        SpesifikasiKamarId: data.id,
      },
      {
        transaction: txn,
      }
    )
    if (linen.length > 0) {
      for (const index in linen) {
        await SpesifikasiKamarLinen.create(
          {
            LinenId: linen[index],
            SpesifikasiKamarId: data.id,
          },
          {
            transaction: txn,
          }
        )
      }
    }
    if (itemKamar.length > 0) {
      for (const index in itemKamar) {
        await SpesifikasiKamarItem.create(
          {
            ItemKamarId: itemKamar[index],
            SpesifikasiKamarId: data.id,
          },
          {
            transaction: txn,
          }
        )
      }
    }
    return data
  }

  /**
   * Update Role By Id
   */
  public static async update(id: string, formData: ISpesifikasiKamar) {
    const data = await this.getOne(id)
    const { linen, itemKamar } = formData
    if (linen.length > 0) {
      await SpesifikasiKamarLinen.destroy({
        where: { SpesifikasiKamarId: data.id },
      })
      for (const index in linen) {
        await SpesifikasiKamarLinen.create({
          LinenId: linen[index],
          SpesifikasiKamarId: data.id,
        })
      }
    }
    if (itemKamar.length > 0) {
      await SpesifikasiKamarItem.destroy({
        where: { SpesifikasiKamarId: data.id },
      })
      for (const index in itemKamar) {
        await SpesifikasiKamarItem.create({
          ItemKamarId: itemKamar[index],
          SpesifikasiKamarId: data.id,
        })
      }
    }

    useValidation(schema.create, {
      ...data.toJSON(),
      ...formData,
    })

    await data.update(formData || {})
    await LogHargaDefaultSpesifikasiKamar.update(
      {
        harga: formData.defaultHargaKamar,
      },
      {
        where: {
          SpesifikasiKamarId: data.id,
        },
      }
    )
    return data
  }

  /**
   * Delete Role By Id
   */
  public static async delete(id: string) {
    const data = await this.getOne(id)
    await data.destroy()
  }
}

export default MasterTipeTamuService
