/* eslint-disable no-unused-vars */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { KonsumsiAttributes } from 'models/konsumsi'
import { LogHargaKonsumsiAttributes } from 'models/loghargakonsumsi'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
// import schema from './schema'

const { Konsumsi, LogHargaKonsumsi } = models
const include = [{ model: LogHargaKonsumsi }]

interface ItemHargaAttributes
  extends KonsumsiAttributes,
    LogHargaKonsumsiAttributes {}
class hargaspesifikasikamarService {
  /**
   * Get All Role
   */
  public static async getAll(req: any) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Konsumsi,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, include)
    )

    const data = await Konsumsi.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await Konsumsi.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   * Get One Role
   */
  public static async getOne(id: string) {
    const data = await Konsumsi.findByPk(id, { include })

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Role
   */
  public static async create(formData: ItemHargaAttributes) {
    // const value = useValidation(schema.create, formData)
    const result = await Konsumsi.create(formData)
    await LogHargaKonsumsi.create({
      harga: formData.harga,
      KonsumsiId: result.id,
    })
    const data = { result, harga: formData.harga }
    return data
  }

  /**
   * Update Role By Id
   */
  public static async update(id: string, formData: ItemHargaAttributes) {
    const data = await this.getOne(id)

    // const value = useValidation(schema.create, {
    //   ...data.toJSON(),
    //   ...formData,
    // })

    await data.update(formData || {})
    await LogHargaKonsumsi.update(
      { harga: formData.harga },
      { where: { KonsumsiId: data.id } }
    )

    return data
  }

  /**
   * Delete Role By Id
   */
  public static async delete(id: string) {
    const data = await this.getOne(id)
    await LogHargaKonsumsi.destroy({ where: { KonsumsiId: data.id } })
    await data.destroy()
  }
}

export default hargaspesifikasikamarService
