/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { LinenAttributes } from 'models/linen'
import { LogHargaLinenAttributes } from 'models/loghargaLinen'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import schema from './schema'

const { Linen, LogHargaLinen } = models
const include = [{ model: LogHargaLinen }]

interface LinenHargaAttributes
  extends LinenAttributes,
    LogHargaLinenAttributes {}

class LinenService {
  /**
   * Get All Role
   */
  public static async getAll(req: any) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Linen,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, include)
    )

    const data = await Linen.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await Linen.count({
      include: includeCount,
      where: queryFind.where,
    })
    const filteredData: any[] = []
    for (const index in data) {
      const hargaLinen = await LogHargaLinen.findOne({
        where: {
          LinenId: data[index].id,
        },
      })
      filteredData.push({
        id: data[index].id,
        idItem: data[index].idItem,
        nama: data[index].nama,
        harga: hargaLinen?.harga || 0,
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
    const data = await Linen.findByPk(id, { include })

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Role
   */
  public static async create(formData: LinenHargaAttributes) {
    useValidation(schema.create, formData)
    const result = await Linen.create(formData)
    await LogHargaLinen.create({
      harga: formData.harga,
      LinenId: result.id,
    })
    const data = { result, harga: formData.harga }
    return data
  }

  /**
   * Update Role By Id
   */
  public static async update(id: string, formData: LinenHargaAttributes) {
    const data = await this.getOne(id)

    useValidation(schema.create, {
      ...data.toJSON(),
      ...formData,
    })
    if (!data.LogHargaLinen) {
      await LogHargaLinen.create({ harga: formData.harga, LinenId: id })
    }
    await data.update(formData || {})
    await LogHargaLinen.update(
      { harga: formData.harga },
      { where: { LinenId: data.id } }
    )

    return data
  }

  /**
   * Delete Role By Id
   */
  public static async delete(id: string) {
    const data = await this.getOne(id)
    await LogHargaLinen.destroy({ where: { LinenId: data.id } })
    await data.destroy()
  }
}

export default LinenService
