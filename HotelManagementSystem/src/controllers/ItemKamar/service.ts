/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-await-in-loop */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { Request } from 'express'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import schema from './schema'

const { ItemKamar, LogHargaItemKamar } = models
const include = [{ model: LogHargaItemKamar }]

interface ItemHargaAttributes {
  nama: string
  harga: any
}
class hargaspesifikasikamarService {
  /**
   * Get All Role
   */
  public static async getAllWithHarga(req: Request) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      ItemKamar,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, include)
    )

    const data = await ItemKamar.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await ItemKamar.count({
      include: includeCount,
      where: queryFind.where,
    })

    const filterData: any[] = []
    for (const index in data) {
      const hargaItem = await LogHargaItemKamar.findOne({
        where: {
          ItemKamarId: data[index].id,
        },
      })
      filterData.push({
        id: data[index].id,
        item: data[index].nama,
        harga: hargaItem?.harga || 0,
      })
    }
    return {
      message: `${total} data has been received.`,
      data: filterData,
      total,
    }
  }

  public static async getAll(req: Request) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      ItemKamar,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, include)
    )

    const data = await ItemKamar.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await ItemKamar.count({
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
    const data = await ItemKamar.findByPk(id, { include })

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }
    return data
  }

  /**
   * Create Role
   */
  public static async create(formData: ItemHargaAttributes) {
    useValidation(schema.create, formData)
    const result = await ItemKamar.create(formData)
    await LogHargaItemKamar.create({
      harga: formData.harga,
      ItemKamarId: result.id,
    })
    const data = { result, harga: formData.harga }
    return data
  }

  /**
   * Update Role By Id
   */
  public static async update(id: string, formData: ItemHargaAttributes) {
    const data = await this.getOne(id)
    let item = await LogHargaItemKamar.findOne({
      where: {
        ItemKamarId: data.id,
      },
    })
    if (!item) {
      item = await LogHargaItemKamar.create({
        ItemKamarId: data.id,
        harga: formData.harga,
      })
    }
    useValidation(schema.create, {
      ...data.toJSON(),
      ...formData,
    })
    await data.update({ ...formData } || {})

    await item.update({ harga: formData.harga })

    return data
  }

  /**
   * Delete Role By Id
   */
  public static async delete(id: string) {
    const data = await this.getOne(id)
    await LogHargaItemKamar.destroy({ where: { ItemKamarId: data.id } })
    await data.destroy()
  }
}

export default hargaspesifikasikamarService
