/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import models from 'models'
import { Request } from 'express'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { tanggalAndTimeGenerate } from 'helpers/Common'
import { getAll } from './modelInclude'

const { LogInventory } = models

class LogInventoryService {
  /**
   * Get All LogInventory
   */
  public static async getAll(req: Request) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      LogInventory,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, getAll)
    )
    const logInventory = await LogInventory.findAll({
      ...queryFind,
      order: order.length ? order : [['updatedAt', 'desc']],
    })
    const total = await LogInventory.count({
      include: includeCount,
      where: queryFind.where,
    })

    const data = logInventory.map((x) => {
      return {
        id: x.id,
        tanggal: tanggalAndTimeGenerate(x.updatedAt, 'll'),
        jam: tanggalAndTimeGenerate(x.updatedAt, 'HH:mm'),
        namaInventory: x.namaInventory,
        MasterJenisInventoryId: x.MasterJenisInventoryId,
        MasterCategoryId: x.MasterCategoryId,
        log: x.log,
        jumlah: x.jumlah,
        keterangan: x.keterangan,
        penanggungJawab: x.penanggungJawab,
        MasterJenisInventory: x.MasterJenisInventory,
        MasterCategory: x.MasterCategory,
      }
    })

    return { message: `${total} data has been received.`, data, total }
  }
}

export default LogInventoryService
