/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import MasterStatusHkService from './service'

routes.get(
  '/master-status-hk',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { message, data, total } = await MasterStatusHkService.getAll(req)
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/statushk-check-swap',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const {
      message,
      data,
      total,
    } = await MasterStatusHkService.getAllMasterCheckAndSwap(req)
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/statushk-detail-leader',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const {
      message,
      data,
      total,
    } = await MasterStatusHkService.getAllMasterDetailHK(req)

    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/master-status-hk/:id',
  Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()

    const data = await MasterStatusHkService.getOne(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/master-status-hk',
  Authorization,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()

    const data = await MasterStatusHkService.create(formData)
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)

routes.put(
  '/master-status-hk/:id',
  Authorization,
  asyncHandler(async function updateData(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()

    const data = await MasterStatusHkService.update(id, formData)
    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/master-status-hk/:id',
  Authorization,
  asyncHandler(async function deleteData(req: Request, res: Response) {
    const { id } = req.getParams()

    await MasterStatusHkService.delete(id)
    const buildResponse = BuildResponse.deleted({})

    return res.status(200).json(buildResponse)
  })
)
