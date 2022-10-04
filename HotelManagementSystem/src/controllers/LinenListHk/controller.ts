/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization, {
  AuthorizationHK,
  AuthorizationHKStaff,
} from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import ListLinenService from './service'

routes.get(
  '/list-linen-hk',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { message, data, total } = await ListLinenService.getAll(req)
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/linen-laundry/:linenId',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { linenId } = req.getParams()
    const data = await ListLinenService.laundryHK(linenId)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/detail-update-Linen/:linenId',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { linenId } = req.getParams()
    const data = await ListLinenService.detailUpdateLinen(linenId)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/detail-linen/:id',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await ListLinenService.getDetailLinen(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/used-linen/:id',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await ListLinenService.usedLinen(id, req)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/laundry-linen/:id',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await ListLinenService.laundryLinen(id, req)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/log-linen-stock/:id',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { id } = req.getParams()
    const { message, data, total } = await ListLinenService.logLinenStock(
      req,
      id
    )
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/laundry-linen-main',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { message, data, total } = await ListLinenService.laundryLinenMain(
      req
    )
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/linen-laundry-detail/:id',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await ListLinenService.detailLaundry(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)
