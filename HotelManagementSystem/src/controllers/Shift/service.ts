/* eslint-disable no-unused-vars */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { ShiftAttributes } from 'models/shift'
import { LogWaktuShiftAttributes } from 'models/logwaktushift'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
// import schema from './schema'

const { Shift, LogWaktuShift } = models

interface ShiftLogWaktuAttributes extends ShiftAttributes {
  LogWaktuShift: LogWaktuShiftAttributes
}

const including = [{ model: LogWaktuShift }]

class ShiftService {
  /**
   * Get All Role
   */
  public static async getAll(req: any) {
    const { filtered } = req.query

    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Shift,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, including)
    )

    const data = await Shift.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await Shift.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   * Get One Role
   */
  public static async getOne(id: string) {
    const data = await Shift.findByPk(id, { include: including })

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Role
   */
  public static async create(formData: ShiftLogWaktuAttributes) {
    // const value = useValidation(schema.create, formData)
    const data = await Shift.create(formData)
    await LogWaktuShift.create({ ...formData.LogWaktuShift, ShiftId: data.id })

    return data
  }

  /**
   * Update Role By Id
   */
  public static async update(id: string, formData: ShiftLogWaktuAttributes) {
    const data = await this.getOne(id)

    // const value = useValidation(schema.create, {
    //   ...data.toJSON(),
    //   ...formData,
    // })

    await data.update(formData || {})
    await LogWaktuShift.update(formData.LogWaktuShift || {}, {
      where: { ShiftId: data.id },
    })
    return data
  }

  /**
   * Delete Role By Id
   */
  public static async delete(id: string) {
    const data = await this.getOne(id)
    await LogWaktuShift.destroy({ where: { ShiftId: data.id } })
    await data.destroy()
  }
}

export default ShiftService
