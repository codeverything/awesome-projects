/* eslint-disable no-unused-vars */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { PromoAttributes } from 'models/promo'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import moment from 'moment'
import { Transaction } from 'sequelize'
import { ConstMasterTipePromo } from 'constants/index'
import { isEqual } from 'lodash'

import schema from './schema'

interface ICheckPromo {
  promo: string
}
const { Promo, MasterTipePromo } = models

class PromoService {
  /**
   * Check Promo
   */
  public static async checkPromo(formData: ICheckPromo, txn: any) {
    useValidation(schema.checkPromo, formData)
    const data = await Promo.findOne({
      where: { kode: formData.promo },
      include: [
        {
          model: MasterTipePromo,
        },
      ],
    })
    if (!data || moment() > moment(data.tanggalSelesai))
      throw new ResponseError.NotFound(
        'Voucher tidak ditemukan atau Voucher sudah kadaluwarsa, Kosongkan terlebih dahulu form Promo'
      )
    return data
  }

  public static async getAll(req: Request | any) {
    const {
      includeCount,
      order,
      ...queryFind
    } = PluginSqlizeQuery.generate(req, Promo, [{ model: MasterTipePromo }])

    const data = await Promo.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })

    const total = await Promo.count({
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
   * Get One Promo
   */
  public static async getOne(id: string) {
    const data = await Promo.findByPk(id, {
      include: [
        {
          model: MasterTipePromo,
          attributes: ['id', 'nama'],
        },
      ],
    })
    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Promo
   */
  public static async create(formData: PromoAttributes, txn: Transaction) {
    useValidation(schema.create, formData)
    const data = await Promo.create(formData, {
      transaction: txn,
    })
    await data.update(
      { sisaKuota: formData.kuota },
      {
        transaction: txn,
      }
    )
    return data
  }

  /**
   * Update Promo By Id
   */
  public static async update(
    id: string,
    formData: PromoAttributes,
    txn: Transaction
  ) {
    const data = await this.getOne(id)

    useValidation(schema.create, {
      ...data.toJSON(),
      ...formData,
    })

    await data.update(formData || {}, {
      transaction: txn,
    })

    return data
  }

  /**
   * Delete Promo By Id
   */
  public static async delete(id: string) {
    const data = await this.getOne(id)
    await data.destroy()
  }
}

export default PromoService
