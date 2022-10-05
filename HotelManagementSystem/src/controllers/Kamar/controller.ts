/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import models from 'models'
import asyncHandler from 'helpers/asyncHandler'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import KamarService from './service'

routes.get(
  '/kamar/:reservasiId',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { reservasiId } = req.getParams()
    const { data, message, total } = await KamarService.getAllBySpec(
      req,
      reservasiId
    )
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)
routes.get(
  '/list-swap-by-spesifikasi/:reservasiKamarId',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { reservasiKamarId } = req.getParams()
    const {
      data,
      message,
      total,
    } = await KamarService.getAllKamarExcludeLowPrice(req, reservasiKamarId)
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)
routes.get(
  '/kamar',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { reservasiId } = req.getParams()
    const { data, message, total } = await KamarService.getAll(req, reservasiId)
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/kamar-connect',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { data, message, total } = await KamarService.getAllKamarNotConnect(
      req
    )
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/kamar-detail/:id',
  Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await KamarService.getOne(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/kamar',
  Authorization,
  asyncHandler(async function create(req: Request, res: Response) {
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const data = await KamarService.create(formData, transaction)
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)

routes.put(
  '/kamar/:id',
  Authorization,
  asyncHandler(async function create(req: Request, res: Response) {
    const { id } = req.getParams()
    const transaction = await req.getTransaction()
    const formData = req.getBody()
    const data = await KamarService.update(id, formData, transaction)
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)

routes.delete(
  '/kamar/:id',
  Authorization,
  asyncHandler(async function create(req: Request, res: Response) {
    const { id } = req.getParams()
    await KamarService.delete(id)
    const buildResponse = BuildResponse.deleted({})

    return res.status(201).json(buildResponse)
  })
)

routes.post(
  '/connecting',
  Authorization,
  asyncHandler(async function create(req: Request, res: Response) {
    const formData = req.getBody()
    const data = await models.ConnectingDoor.create(formData)
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)
