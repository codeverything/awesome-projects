/* eslint-disable no-unused-vars */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import schema from './schema'

const {
  MasterFasilitasTambahan,
  JenisFasilitasTambahan,
  MasterSourcePemesanan,
  LogHargaMasterFasilitasTambahan,
  MasterSatuan,
} = models

interface FasilitasTambahanHargaAttributes {
  JenisFasilitasTambahanId: string
  MasterSourcePemesananId: string
  harga: number
}

const including = [
  { model: JenisFasilitasTambahan },
  { model: JenisFasilitasTambahan },
  { model: LogHargaMasterFasilitasTambahan },
  { model: MasterSourcePemesanan },
  { model: MasterSatuan, attributes: ['nama'] },
]

class MasterFasilitasTambahanService {
  /**
   * Get All Role
   */
  public static async getAll(req: any) {
    const { filtered } = req.query

    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      MasterFasilitasTambahan,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, including)
    )
    const data = await MasterFasilitasTambahan.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await MasterFasilitasTambahan.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   * Get One Role
   */
  public static async getOne(id: string) {
    const data = await MasterFasilitasTambahan.findByPk(id, {
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
  public static async create(formData: FasilitasTambahanHargaAttributes) {
    useValidation(schema.create, formData)
    const data = await MasterFasilitasTambahan.create(formData)
    await LogHargaMasterFasilitasTambahan.create({
      ...formData,
      MasterFasilitasTambahanId: data.id,
    })
    return data
  }

  /**
   * Update Role By Id
   */
  public static async update(
    id: string,
    formData: FasilitasTambahanHargaAttributes
  ) {
    const data = await this.getOne(id)

    useValidation(schema.create, {
      ...data.toJSON(),
      ...formData,
    })
    await LogHargaMasterFasilitasTambahan.update(formData || {}, {
      where: { MasterFasilitasTambahanId: data.id },
    })
    await data.update(formData || {})

    return data
  }

  /**
   * Delete Role By Id
   */
  public static async delete(id: string) {
    const data = await this.getOne(id)
    await LogHargaMasterFasilitasTambahan.destroy({
      where: { MasterFasilitasTambahanId: data.id },
    })
    await data.destroy()
  }
}

export default MasterFasilitasTambahanService
