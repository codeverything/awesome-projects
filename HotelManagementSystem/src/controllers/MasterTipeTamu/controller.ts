/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import MasterTipeTamuService from './service'

routes.get(
  '/master-tipe-tamu',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { message, data, total } = await MasterTipeTamuService.getAll(req)
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/master-tipe-tamu/:id',
  Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()

    const data = await MasterTipeTamuService.getOne(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/master-tipe-tamu',
  Authorization,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()

    const data = await MasterTipeTamuService.create(formData)
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)

routes.put(
  '/master-tipe-tamu/:id',
  Authorization,
  asyncHandler(async function updateData(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()

    const data = await MasterTipeTamuService.update(id, formData)
    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/master-tipe-tamu/:id',
  Authorization,
  asyncHandler(async function deleteData(req: Request, res: Response) {
    const { id } = req.getParams()

    await MasterTipeTamuService.delete(id)
    const buildResponse = BuildResponse.deleted({})

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/master-tipe-barang',
  Authorization,
  asyncHandler(async function deleteData(req: Request, res: Response) {
    const {
      data,
      total,
      message,
    } = await MasterTipeTamuService.getAllTipeBarang(req)
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)
