/* eslint-disable no-unused-vars */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { EarlyLateChargeAttributes } from 'models/earlylatecharges'
import { LogHargaEarlyLateChargeAttributes } from 'models/loghargaearlylatecharge'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
// import schema from './schema'

const { EarlyLateCharge, LogHargaEarlyLateCharge } = models

const including = [{ model: LogHargaEarlyLateCharge }]

interface LateCheckOutHargaAttributes
  extends EarlyLateChargeAttributes,
    LogHargaEarlyLateChargeAttributes {}

class LateCheckOutService {
  /**
   * Get All Role
   */
  public static async getAll(req: any) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      EarlyLateCharge,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, including)
    )

    const data = await EarlyLateCharge.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await EarlyLateCharge.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   * Get One Role
   */
  public static async getOne(id: string) {
    const data = await EarlyLateCharge.findByPk(id, { include: including })

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Role
   */
  public static async create(formData: LateCheckOutHargaAttributes) {
    // const value = useValidation(schema.create, formData)
    const data = await EarlyLateCharge.create(formData)
    await LogHargaEarlyLateCharge.create({
      ...formData,
      EarlyLateChargeId: data.id,
    })
    return data
  }

  /**
   * Update Role By Id
   */
  public static async update(
    id: string,
    formData: LateCheckOutHargaAttributes
  ) {
    const data = await this.getOne(id)

    // const value = useValidation(schema.create, {
    //   ...data.toJSON(),
    //   ...formData,
    // })

    await data.update(formData || {})
    await LogHargaEarlyLateCharge.update(formData || {}, {
      where: { EarlyLateChargeId: data.id },
    })
    return data
  }

  /**
   * Delete Role By Id
   */
  public static async delete(id: string) {
    const data = await this.getOne(id)
    await LogHargaEarlyLateCharge.destroy({
      where: { EarlyLateChargeId: data.id },
    })
    await data.destroy()
  }
}

export default LateCheckOutService
