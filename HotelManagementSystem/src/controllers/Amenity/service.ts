/* eslint-disable no-plusplus */
/* eslint-disable no-const-assign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { AmenitieAttributes } from 'models/amenities'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import schema from './schema'

const { Amenity, LogHargaLinen } = models

class AmenityService {
  /**
   * Get All Role
   */
  public static async getAll(req: any) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Amenity,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [])
    )

    const data = await Amenity.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await Amenity.count({
      include: includeCount,
      where: queryFind.where,
    })

    const filteredData: any[] = []
    for (const index in data) {
      filteredData.push({
        id: data[index].id,
        idItem: data[index].idItem,
        nama: data[index].nama,
        jumlah: data[index].jumlah,
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
    const data = await Amenity.findByPk(id)

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Role
   */
  public static async create(formData: AmenitieAttributes) {
    const value = useValidation(schema.create, formData)
    const data = await Amenity.create(formData)
    return data
  }

  /**
   * Update Role By Id
   */
  public static async update(id: string, formData: AmenitieAttributes) {
    const data = await this.getOne(id)

    // const value = useValidation(schema.create, {
    //   ...data.toJSON(),
    //   ...formData,
    // })

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

export default AmenityService
