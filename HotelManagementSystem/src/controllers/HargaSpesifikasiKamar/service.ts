/* eslint-disable no-unused-vars */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { HargaSpesifikasiKamarAttributes } from 'models/hargaspesifikasikamar'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import schema from './schema'

const { HargaSpesifikasiKamar, SpesifikasiKamar } = models

const including = [{ model: SpesifikasiKamar }]

class HargaspesifikasikamarService {
  /**
   * Get All Role
   */
  public static async getAll(req: any) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      HargaSpesifikasiKamar,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, including)
    )

    const data = await HargaSpesifikasiKamar.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await HargaSpesifikasiKamar.count({
      include: includeCount,
      where: queryFind.where,
    })
    const filteredData = data.map((x) => {
      return {
        id: x.id,
        spesifikasiKamar: x.SpesifikasiKamar!.nama,
        tanggalMulai: x.tanggalMulai,
        tanggalSelesai: x.tanggalSelesai,
        harga: x.harga,
      }
    })
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
    const data = await HargaSpesifikasiKamar.findByPk(id, {
      include: including,
    })

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Role
   */
  public static async create(formData: HargaSpesifikasiKamarAttributes) {
    useValidation(schema.create, formData)
    const data = await HargaSpesifikasiKamar.create(formData)

    return data
  }

  /**
   * Update Role By Id
   */
  public static async update(
    id: string,
    formData: HargaSpesifikasiKamarAttributes
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
   * Delete Role By Id
   */
  public static async delete(id: string) {
    const data = await this.getOne(id)
    await data.destroy()
  }
}

export default HargaspesifikasikamarService
