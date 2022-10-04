/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import { ConstRole } from 'constants/index'
import ResponseError from 'modules/Response/ResponseError'
import RoomHKService from './service'

routes.get(
  '/room-hk',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { message, data, total } = await RoomHKService.getAll(req)
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/detail-room-hk/:kamarId',
  Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { kamarId } = req.getParams()
    const data = await RoomHKService.getOne(kamarId, req)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/detail-room-linen-hk/:kamarId',
  Authorization,
  asyncHandler(async function getOneLinen(req: Request, res: Response) {
    const { kamarId } = req.getParams()
    const data = await RoomHKService.getOneKamarLinen(kamarId, req)
    const buildResponse = BuildResponse.get({ data })
    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/detail-room-item-hk/:kamarId',
  Authorization,
  asyncHandler(async function getOneKamarItemKamar(
    req: Request,
    res: Response
  ) {
    const { kamarId } = req.getParams()
    const data = await RoomHKService.getOneKamarItemKamar(kamarId, req)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/detail-room-amenity/:kamarId',
  Authorization,
  asyncHandler(async function getOneKamarItemKamar(
    req: Request,
    res: Response
  ) {
    const { kamarId } = req.getParams()
    const data = await RoomHKService.getLeaderAmenities(kamarId, req)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/detail-room-checker/:kamarId',
  Authorization,
  asyncHandler(async function getOneKamarItemKamar(
    req: Request,
    res: Response
  ) {
    const { kamarId } = req.getParams()
    const data = await RoomHKService.getLeaderChecker(kamarId, req)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/linen-by-spesifikasi/:kamarId',
  Authorization,
  asyncHandler(async function getOneKamarItemKamar(
    req: Request,
    res: Response
  ) {
    const { kamarId } = req.getParams()
    const { data, total, message } = await RoomHKService.getLinenBySpesifikasi(
      kamarId,
      req
    )
    const buildResponse = BuildResponse.get({ data, total, message })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/lost-and-found/:kamarId',
  Authorization,
  asyncHandler(async function getOneKamarItemKamar(
    req: Request,
    res: Response
  ) {
    const { kamarId } = req.getParams()
    const data = await RoomHKService.getLeaderLostAndFound(kamarId, req)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/log-kamar/:kamarId',
  Authorization,
  asyncHandler(async function getOneKamarItemKamar(
    req: Request,
    res: Response
  ) {
    const { kamarId } = req.getParams()
    const { data, total, message } = await RoomHKService.getLogKamar(
      kamarId,
      req
    )
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/log-linen/:kamarId',
  Authorization,
  asyncHandler(async function getOneKamarItemKamar(
    req: Request,
    res: Response
  ) {
    const { kamarId } = req.getParams()
    const { data, message } = await RoomHKService.getLogLinen(kamarId, req)
    const buildResponse = BuildResponse.get({ message, data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/detail-room-linen/:kamarId',
  Authorization,
  asyncHandler(async function getOneKamarItemKamar(
    req: Request,
    res: Response
  ) {
    const { kamarId } = req.getParams()
    const { data, message } = await RoomHKService.getLinenSupply(kamarId, req)
    const buildResponse = BuildResponse.get({ message, data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/linen-supply/:id',
  Authorization,
  asyncHandler(async function getOneKamarItemKamar(
    req: Request,
    res: Response
  ) {
    const { id } = req.getParams()
    const data = await RoomHKService.getOneLinenSupply(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/amenity-supply/:id',
  Authorization,
  asyncHandler(async function getOneKamarItemKamar(
    req: Request,
    res: Response
  ) {
    const { id } = req.getParams()
    const data = await RoomHKService.getOneAmenitySupply(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/lost-and-found-supply/:id',
  Authorization,
  asyncHandler(async function getOneKamarItemKamar(
    req: Request,
    res: Response
  ) {
    const { id } = req.getParams()
    const data = await RoomHKService.getOneLostAndFound(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)
