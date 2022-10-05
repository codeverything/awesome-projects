/* eslint-disable no-unused-vars */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { MasterStatusPembayaranAttributes } from 'models/masterstatuspembayaran'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import schema from './schema'

const { MasterStatusPembayaran } = models

class MasterStatusPembayaranService {
  /**
   * Get All Role
   */
  public static async getAll(req: any) {
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      MasterStatusPembayaran,
      []
    )

    const data = await MasterStatusPembayaran.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await MasterStatusPembayaran.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   * Get One Role
   */
  public static async getOne(id: string) {
    const data = await MasterStatusPembayaran.findByPk(id)

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Role
   */
  public static async create(formData: MasterStatusPembayaranAttributes) {
    const value = useValidation(schema.create, formData)
    const data = await MasterStatusPembayaran.create(value)

    return data
  }

  /**
   * Update Role By Id
   */
  public static async update(
    id: string,
    formData: MasterStatusPembayaranAttributes
  ) {
    const data = await this.getOne(id)

    const value = useValidation(schema.create, {
      ...data.toJSON(),
      ...formData,
    })

    await data.update(value || {})

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

export default MasterStatusPembayaranService
