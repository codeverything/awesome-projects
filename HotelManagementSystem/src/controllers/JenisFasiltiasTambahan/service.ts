/* eslint-disable no-unused-vars */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { JenisFasilitasTambahanAttributes } from 'models/jenisfasilitastambahan'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import schema from './schema'

const { JenisFasilitasTambahan } = models

class JenisFasilitasTambahanService {
  /**
   * Get All Jenis Fasilitas Tambahan
   */
  public static async getAll(req: any) {
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      JenisFasilitasTambahan,
      []
    )

    const data = await JenisFasilitasTambahan.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await JenisFasilitasTambahan.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   * Get One Jenis Fasilitas Tambahan
   */
  public static async getOne(id: string) {
    const data = await JenisFasilitasTambahan.findByPk(id)

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Jenis Fasilitas Tambahan
   */
  public static async create(formData: JenisFasilitasTambahanAttributes) {
    useValidation(schema.create, formData)
    const data = await JenisFasilitasTambahan.create(formData)

    return data
  }

  /**
   * Update Jenis Fasilitas Tambahan By Id
   */
  public static async update(
    id: string,
    formData: JenisFasilitasTambahanAttributes
  ) {
    const data = await this.getOne(id)

    useValidation(schema.create, {
      ...data.toJSON(),
      ...formData,
    })

    await data.update(formData || {})

    return data
  }

  /**
   * Delete Jenis Fasilitas Tambahan By Id
   */
  public static async delete(id: string) {
    const data = await this.getOne(id)
    await data.destroy()
  }
}

export default JenisFasilitasTambahanService
