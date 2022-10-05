/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization, { AuthorizationHK } from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import ListLinenService from './service'

routes.get(
  '/list-amenity-hk',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { message, data, total } = await ListLinenService.getAll(req)
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/list-amenity-hk/:id',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await ListLinenService.getDetail(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/log-amenity-stock/:id',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await ListLinenService.getDetailLog(id, req)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)
