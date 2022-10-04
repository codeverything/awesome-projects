/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization, {
  AuthorizationHKAndFo,
  AuthorizationFO,
} from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import LogLostAndFoundService from './service'

routes.get(
  '/log-lost-and-found',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { message, data, total } = await LogLostAndFoundService.getAll(req)
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/master-lost-and-found',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const {
      message,
      data,
      total,
    } = await LogLostAndFoundService.getAllMasterLostAndFound(req)
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/log-lost-and-found/:id',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await LogLostAndFoundService.getDetail(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/log-lost-and-found/:id',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const formData = req.getBody()
    const { id } = req.getParams()
    const transaction = await req.getTransaction()
    const data = await LogLostAndFoundService.updateBarangHilang(
      formData,
      id,
      transaction
    )
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })

    return res.status(200).json(buildResponse)
  })
)
