/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import models from 'models'
import { Request } from 'express'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { Op } from 'sequelize'
import { tanggalAndTimeGenerate } from 'helpers/Common'

const { Amenity, LogAmenities, MasterCategory } = models

class ListLinenHKService {
  /**
   * Get All Amenity
   */
  public static async getAll(req: Request) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Amenity,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [])
    )
    const amenity = await Amenity.findAll({
      ...queryFind,
      order: order.length ? order : [['updatedAt', 'desc']],
    })
    const total = await Amenity.count({
      include: includeCount,
      where: queryFind.where,
    })

    const data = amenity.map((x) => {
      return {
        id: x.id,
        nama: x.nama,
        total: x.jumlah,
      }
    })

    return { message: `${total} data has been received.`, data, total }
  }

  public static async getDetail(id: string) {
    const amenity = await Amenity.findByPk(id)
    const data = {
      id: amenity?.id,
      nama: amenity?.nama,
      jumlah: amenity?.jumlah,
    }

    return data
  }

  public static async getDetailLog(id: string, req: Request) {
    const amenity = await this.getDetail(id)
    const { filtered } = req.query
    const { order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      Amenity,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, [
        { model: MasterCategory },
      ])
    )
    queryFind.where = {
      [Op.and]: {
        AmenityId: id,
      },
      ...queryFind.where,
    }
    const logAmenity = await LogAmenities.findAll({
      ...queryFind,
      order: order.length ? order : [['updatedAt', 'desc']],
    })
    const filterLogAmenity = logAmenity.map((x) => {
      return {
        logAmenityId: x.id,
        tanggal: tanggalAndTimeGenerate(x.updatedAt, 'DD-MM-YYYY'),
        jam: tanggalAndTimeGenerate(x.updatedAt, 'HH.mm'),
        MasterCategoryId: x.MasterCategoryId,
        MasterCategory: x.MasterCategory,
        log: x.log,
        keterangan: x.keterangan || '-',
        jumlah: x.jumlah,
        penanggungJawab: x.namaStaff,
      }
    })
    const data = {
      id: amenity?.id,
      nama: amenity?.nama,
      jumlah: amenity?.jumlah,
      logAmenity: filterLogAmenity,
    }

    return data
  }
}

export default ListLinenHKService
