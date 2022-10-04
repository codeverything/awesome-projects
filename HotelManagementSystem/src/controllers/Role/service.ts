/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { RoleAttributes } from 'models/role'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { Transaction } from 'sequelize'
import { map } from 'lodash'
import schema from './schema'

const { Role } = models

interface IRoleAttributes {
  nama: string
  hakAkses: string
}

class RoleService {
  /**
   * Get All Role
   */
  public static async getAll(req: any) {
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Role,
      []
    )

    const data = await Role.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await Role.count({
      include: includeCount,
      where: queryFind.where,
    })
    const filterData = map(data, (x) => {
      return {
        id: x.id,
        nama: x.nama,
      }
    })
    return {
      message: `${total} data has been received.`,
      data: filterData,
      total,
    }
  }

  /**
   * Get One Role
   */
  public static async getOne(id: string) {
    const data = await Role.findByPk(id)

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Role
   */
  public static async create(formData: IRoleAttributes, txn: Transaction) {
    useValidation(schema.create, formData)
    const data = await Role.create(formData, {
      transaction: txn,
    })

    return data
  }

  /**
   * Update Role By Id
   */
  public static async update(id: string, formData: RoleAttributes) {
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

export default RoleService
