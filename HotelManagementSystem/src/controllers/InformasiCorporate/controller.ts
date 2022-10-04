/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import BuildResponse from 'modules/Response/BuildResponse'
import Authorization from 'middlewares/Authorization'
import InformasiCorporateService from './service'

routes.get(
  '/informasi-corporate',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { data, total } = await InformasiCorporateService.getAll(req)
    const buildResponse = BuildResponse.get({ data, total })
    return res.status(200).json(buildResponse)
  })
)
routes.get(
  '/informasi-corporate/:id',
  Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await InformasiCorporateService.getOne(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/informasi-corporate',
  Authorization,
  asyncHandler(async function create(req: Request, res: Response) {
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const data = await InformasiCorporateService.create(formData, transaction)
    await transaction.commit()
    const buildResponse = BuildResponse.get({ data })
    return res.status(200).json(buildResponse)
  })
)

routes.put(
  '/informasi-corporate/:id',
  Authorization,
  asyncHandler(async function create(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const data = await InformasiCorporateService.update(
      id,
      formData,
      transaction
    )
    const buildResponse = BuildResponse.get({ data })
    await transaction.commit()
    return res.status(200).json(buildResponse)
  })
)
routes.delete(
  '/informasi-corporate/:id',
  Authorization,
  asyncHandler(async function create(req: Request, res: Response) {
    const { id } = req.getParams()
    await InformasiCorporateService.delete(id)

    const buildResponse = BuildResponse.deleted({})
    return res.status(200).json(buildResponse)
  })
)
