/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import SimpleMasterService from './service'

routes.get(
  '/master-penghitungan',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const {
      data,
      message,
      total,
    } = await SimpleMasterService.getAllMasterPenghitungan(req)
    const buildResponse = BuildResponse.get({ data, message, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/master-jenis-laundry',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const {
      data,
      message,
      total,
    } = await SimpleMasterService.getAllMasterJenisVendorLaundry(req)
    const buildResponse = BuildResponse.get({ data, message, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/master-tipe-promo',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const {
      data,
      message,
      total,
    } = await SimpleMasterService.getAllMasterTipePromo(req)
    const buildResponse = BuildResponse.get({ data, message, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/master-keterangan',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const {
      data,
      message,
      total,
    } = await SimpleMasterService.getAllMasterKeterangan(req)
    const buildResponse = BuildResponse.get({ data, message, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/master-jenis-inventory',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const {
      data,
      message,
      total,
    } = await SimpleMasterService.getAllMasterJenisInventory(req)
    const buildResponse = BuildResponse.get({ data, message, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/master-category',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const {
      data,
      message,
      total,
    } = await SimpleMasterService.getAllMasterCategory(req)
    const buildResponse = BuildResponse.get({ data, message, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/master-status-kamar',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const {
      data,
      message,
      total,
    } = await SimpleMasterService.getAllMasterStatusKamar(req)
    const buildResponse = BuildResponse.get({ data, message, total })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/master-satuan',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const data = await SimpleMasterService.createMasterSatuan(req.getBody())
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)
