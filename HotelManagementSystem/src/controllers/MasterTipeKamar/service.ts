/* eslint-disable no-unused-vars */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { MasterTipeKamarAttributes } from 'models/mastertipekamar'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import schema from './schema'

const { MasterTipeKamar } = models

class MasterTipeKamarService {
  /**
   * Get All Role
   */
  public static async getAll(req: any) {
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      MasterTipeKamar,
      []
    )

    const data = await MasterTipeKamar.findAll({
      ...queryFind,
      attributes: ['id', 'nama'],
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await MasterTipeKamar.count({
      include: includeCount,
      where: queryFind.where,
    })
    // const filterData = data.map((x, index) => {
    //   return {
    //     id: x.id,
    //     nomor: index + 1,
    //     nama: x.nama,
    //   }
    // })
    return { message: `${total} data has been received.`, data, total }
  }

  /**
   * Get One Role
   */
  public static async getOne(id: string) {
    const data = await MasterTipeKamar.findByPk(id)

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Role
   */
  public static async create(formData: MasterTipeKamarAttributes) {
    const value = useValidation(schema.create, formData)
    const data = await MasterTipeKamar.create(value)

    return data
  }

  /**
   * Update Role By Id
   */
  public static async update(id: string, formData: MasterTipeKamarAttributes) {
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

export default MasterTipeKamarService
