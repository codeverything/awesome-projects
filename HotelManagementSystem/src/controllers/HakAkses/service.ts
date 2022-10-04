/* eslint-disable no-unused-vars */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { HakAksesAttributes } from 'models/hakakses'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { Transaction } from 'sequelize'
import schema from './schema'

const { HakAkses } = models

class HakAksesService {
  /**
   * Get All Hak Akses
   */
  public static async getAll(req: any) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      HakAkses,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [])
    )

    const data = await HakAkses.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await HakAkses.count({
      include: includeCount,
      where: queryFind.where,
    })
    const filteredData = data.map((x) => {
      return {
        id: x.id,
        nama: x.nama,
        hakAkses: JSON.parse(x.hakAkses),
      }
    })
    return {
      message: `${total} data has been received.`,
      data: filteredData,
      total,
    }
  }

  /**
   * Get One Hak Akses di olah datanya di model di addHook beforeFind
   */
  public static async getOne(id: string) {
    const data = await HakAkses.findByPk(id)

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }
    return data
  }

  /**
   * Create Hak Akses
   */
  public static async create(formData: HakAksesAttributes, txn: Transaction) {
    useValidation(schema.create, formData)
    const data = await HakAkses.create(formData, {
      transaction: txn,
    })
    return data
  }

  /**
   * Update Hak Akses By Id
   */
  public static async update(id: string, formData: HakAksesAttributes) {
    const data = await this.getOne(id)
    useValidation(schema.create, {
      ...data.toJSON(),
      ...formData,
    })

    await data.update(formData || {})
    return data
  }

  /**
   * Delete Hak Akses By Id
   */
  public static async delete(id: string) {
    const data = await this.getOne(id)
    await data.destroy()
  }
}

export default HakAksesService
