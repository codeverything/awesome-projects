/* eslint-disable no-unused-vars */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import { VendorLaundryAttributes } from 'models/vendorLaundry'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import useValidation from 'helpers/useValidation'
import schema from './schema'

const { VendorLaundry, MasterJenisVendorLaundry } = models

const including = [{ model: MasterJenisVendorLaundry }]

class VendorLaundryService {
  /**
   * Get All Role
   */
  public static async getAll(req: any) {
    const { filtered } = req.query

    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      VendorLaundry,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, including)
    )

    const data = await VendorLaundry.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await VendorLaundry.count({
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
   * Get One Role
   */
  public static async getOne(id: string) {
    const data = await VendorLaundry.findByPk(id, { include: including })

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Role
   */
  public static async create(formData: VendorLaundryAttributes) {
    useValidation(schema.create, formData)
    const data = await VendorLaundry.create(formData)

    return data
  }

  /**
   * Update Role By Id
   */
  public static async update(id: string, formData: VendorLaundryAttributes) {
    const data = await this.getOne(id)

    useValidation(schema.create, {
      ...data.toJSON(),
      ...formData,
    })

    await data.update(formData || {})

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

export default VendorLaundryService
