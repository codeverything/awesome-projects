/* eslint-disable no-unused-vars */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { MasterStatusHKAttributes } from 'models/masterstatushk'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { Op } from 'sequelize'
import { ConstMasterStatusHK, ConstRole } from 'constants/index'
import schema from './schema'

const { MasterStatusHK } = models

class MasterStatusHKService {
  /**
   * Get All Role
   */
  public static async getAll(req: any) {
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      MasterStatusHK,
      []
    )
    const filtered = req.query.filtered ? JSON.parse(req.query.filtered) : null
    if (req.token.data.RoleId === ConstRole.HK_STAFF && !filtered) {
      queryFind.where = {
        id: [
          ConstMasterStatusHK.VACANT_CLEAN,
          ConstMasterStatusHK.VACANT_DIRTY,
          ConstMasterStatusHK.OUT_OF_OPERATION,
        ],
      }
    } else if (req.token.data.RoleId === ConstRole.HK_LEADER && !filtered) {
      queryFind.where = {
        id: {
          [Op.not]: [
            ConstMasterStatusHK.CHECKED,
            ConstMasterStatusHK.NEED_CHECK,
          ],
        },
      }
    } else if (filtered) {
      queryFind.where = {}
    }
    const data = await MasterStatusHK.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await MasterStatusHK.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  public static async getAllMasterCheckAndSwap(req: any) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      MasterStatusHK,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [])
    )
    queryFind.where = {
      id: [
        ConstMasterStatusHK.VACANT_DIRTY,
        ConstMasterStatusHK.OUT_OF_OPERATION,
      ],
    }
    const data = await MasterStatusHK.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await MasterStatusHK.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  public static async getAllMasterDetailHK(req: any) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      MasterStatusHK,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [])
    )
    queryFind.where = {
      id: [
        ConstMasterStatusHK.VACANT_DIRTY,
        ConstMasterStatusHK.VACANT_CLEAN,
        ConstMasterStatusHK.AVAILABLE_CLEAN,
      ],
    }
    const data = await MasterStatusHK.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await MasterStatusHK.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  /**
   * Get One Role
   */
  public static async getOne(id: string) {
    const data = await MasterStatusHK.findByPk(id)

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Role
   */
  public static async create(formData: MasterStatusHKAttributes) {
    const value = useValidation(schema.create, formData)
    const data = await MasterStatusHK.create(value)

    return data
  }

  /**
   * Update Role By Id
   */
  public static async update(id: string, formData: MasterStatusHKAttributes) {
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

export default MasterStatusHKService
