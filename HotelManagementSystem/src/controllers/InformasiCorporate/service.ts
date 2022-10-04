/* eslint-disable no-unused-vars */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { PerusahaanAttributes } from 'models/perusahaan'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { Transaction } from 'sequelize'
import schema from './schema'

const { Perusahaan, InformasiOrang } = models

class InformasiCorporateService {
  /**
   * Get All Informasi Corporate
   */
  public static async getAll(req: any) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Perusahaan,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [])
    )

    const data = await Perusahaan.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })

    const total = await Perusahaan.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   * Get One Informasi Corporate
   */
  public static async getOne(id: string) {
    const data = await Perusahaan.findByPk(id, {
      include: { model: InformasiOrang },
    })

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Informasi Corporate
   */
  public static async create(formData: PerusahaanAttributes, txn: Transaction) {
    useValidation(schema.create, formData)
    const data = await Perusahaan.create(formData, {
      transaction: txn,
    })

    return data
  }

  /**
   * Update Informasi Corporate By Id
   */
  public static async update(
    id: string,
    formData: PerusahaanAttributes,
    txn: Transaction
  ) {
    const data = await this.getOne(id)
    useValidation(schema.create, {
      ...data.toJSON(),
      ...formData,
    })
    await data.update(formData || {}, {
      transaction: txn,
    })
    return data
  }

  /**
   * Delete Informasi Corporate By Id
   */
  public static async delete(id: string) {
    const data = await this.getOne(id)
    await data.destroy()
  }
}

export default InformasiCorporateService
