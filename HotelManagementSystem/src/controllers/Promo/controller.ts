/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import PromoService from './service'

routes.post(
  '/check-promo',
  Authorization,
  asyncHandler(async function checkPromo(req: Request, res: Response) {
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const data = await PromoService.checkPromo(formData, transaction)
    await transaction.commit()
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/promo',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { message, data, total } = await PromoService.getAll(req)
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/promo/:id',
  Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()

    const data = await PromoService.getOne(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/promo',
  Authorization,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()
    const transaction = await req.getTransaction()

    const data = await PromoService.create(formData, transaction)
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)

routes.put(
  '/promo/:id',
  Authorization,
  asyncHandler(async function updateData(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()
    const transaction = await req.getTransaction()

    const data = await PromoService.update(id, formData, transaction)
    await transaction.commit()
    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/promo/:id',
  Authorization,
  asyncHandler(async function deleteData(req: Request, res: Response) {
    const { id } = req.getParams()

    await PromoService.delete(id)
    const buildResponse = BuildResponse.deleted({})

    return res.status(200).json(buildResponse)
  })
)
