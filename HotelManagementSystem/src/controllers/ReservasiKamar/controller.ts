/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import ReservasiKamarService from './service'

routes.get(
  '/all-reservasi-kamar/:reservasiId',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { reservasiId } = req.getParams()
    const { message, data, total } = await ReservasiKamarService.getAll(
      reservasiId,
      req
    )
    const buildResponse = BuildResponse.get({ message, data, total })
    return res.status(200).json(buildResponse)
  })
)
routes.get(
  '/reservasi-kamar/:id',
  Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await ReservasiKamarService.getOne(id)
    const buildResponse = BuildResponse.get({ data })
    return res.status(200).json(buildResponse)
  })
)
routes.post(
  '/reservasi-kamar',
  Authorization,
  asyncHandler(async function create(req: Request, res: Response) {
    const formData = req.getBody()
    const data = await ReservasiKamarService.create(formData)
    const buildResponse = BuildResponse.created({ data })
    return res.status(200).json(buildResponse)
  })
)

routes.put(
  '/extend-kamar/:reservasiKamarId',
  Authorization,
  asyncHandler(async function extendKamar(req: Request, res: Response) {
    const formData = req.getBody()
    const { reservasiKamarId } = req.getParams()
    const transaction = await req.getTransaction()
    const data = await ReservasiKamarService.extendKamar(
      reservasiKamarId,
      formData,
      transaction
    )
    await transaction.commit()
    const buildResponse = BuildResponse.updated({
      data,
    })
    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/update-invoice/:id',
  Authorization,
  asyncHandler(async function checkOut(req: Request, res: Response) {
    const formData = req.getBody()
    const { id } = req.getParams()
    const transaction = await req.getTransaction()
    const data = await ReservasiKamarService.updateInvoice(
      id,
      formData,
      transaction
    )
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })
    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/check-out/:id',
  Authorization,
  asyncHandler(async function checkOut(req: Request, res: Response) {
    const formData = req.getBody()
    const { id } = req.getParams()
    const transaction = await req.getTransaction()
    const data = await ReservasiKamarService.checkOut(id, formData, transaction)
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })
    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/check-kamar/:id',
  Authorization,
  asyncHandler(async function checkOut(req: Request, res: Response) {
    const { id } = req.getParams()
    const transaction = await req.getTransaction()

    const data = await ReservasiKamarService.checkKamar(id, transaction)
    await transaction.commit()

    const buildResponse = BuildResponse.created({ data })
    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/detail-check-kamar/:id',
  Authorization,
  asyncHandler(async function checkOut(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await ReservasiKamarService.detailKamar(id)
    const buildResponse = BuildResponse.get({ data })
    return res.status(200).json(buildResponse)
  })
)

routes.put(
  '/swap-kamar/:id',
  Authorization,
  asyncHandler(async function swapKamar(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const data = await ReservasiKamarService.swapKamar(
      id,
      formData,
      transaction
    )
    const buildResponse = BuildResponse.updated({ data })
    await transaction.commit()
    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/reservasi-kamar/:id',
  Authorization,
  asyncHandler(async function swapKamar(req: Request, res: Response) {
    const { id } = req.getParams()
    const transaction = await req.getTransaction()
    await ReservasiKamarService.deleteKamar(id, transaction)
    const buildResponse = BuildResponse.deleted({})
    await transaction.commit()
    return res.status(200).json(buildResponse)
  })
)
