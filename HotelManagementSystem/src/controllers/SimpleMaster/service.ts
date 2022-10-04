import models from 'models'
import { Request } from 'express'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { ConstMasterCategory } from 'constants/index'
import { Op } from 'sequelize'

const {
  MasterPenghitungan,
  MasterCategory,
  MasterKeterangan,
  MasterJenisInventory,
  MasterTipePromo,
  MasterStatusKamar,
  MasterJenisVendorLaundry,
  MasterSatuan,
} = models

class ListLinenHKService {
  public static async getAllMasterPenghitungan(req: Request) {
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      MasterPenghitungan,
      []
    )

    const data = await MasterPenghitungan.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await MasterPenghitungan.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  public static async getAllMasterKeterangan(req: Request) {
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      MasterKeterangan,
      []
    )

    const data = await MasterKeterangan.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await MasterKeterangan.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  public static async getAllMasterTipePromo(req: Request) {
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      MasterTipePromo,
      []
    )

    const data = await MasterTipePromo.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await MasterTipePromo.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  public static async getAllMasterJenisInventory(req: Request) {
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      MasterJenisInventory,
      []
    )

    const data = await MasterJenisInventory.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await MasterJenisInventory.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  public static async getAllMasterCategory(req: Request | any) {
    const { includeCount, order } = PluginSqlizeQuery.generate(
      req,
      MasterCategory,
      []
    )
    const filtered = req.query.filtered ? JSON.parse(req.query.filtered) : null
    const queryFind: any = {}
    if (filtered) {
      queryFind.where = {
        id: {
          [Op.not]: ConstMasterCategory.LAUNDRY,
        },
      }
    } else {
      queryFind.where = {}
    }
    const data = await MasterCategory.findAll({
      where: queryFind.where,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await MasterCategory.count({
      where: queryFind.where,
      include: includeCount,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  public static async getAllMasterJenisVendorLaundry(req: Request) {
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      MasterJenisVendorLaundry,
      []
    )

    const data = await MasterJenisVendorLaundry.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await MasterJenisVendorLaundry.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  public static async getAllMasterStatusKamar(req: Request) {
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      MasterStatusKamar,
      []
    )

    const data = await MasterStatusKamar.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await MasterStatusKamar.count({
      include: includeCount,
      where: queryFind.where,
    })

    return { message: `${total} data has been received.`, data, total }
  }

  public static async createMasterSatuan(formData: any) {
    const data = await MasterSatuan.create(formData)

    return data
  }
}

export default ListLinenHKService
