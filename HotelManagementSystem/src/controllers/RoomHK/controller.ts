/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization, { AuthorizationHK } from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import { ConstRole } from 'constants/index'
import ResponseError from 'modules/Response/ResponseError'
import RoomHKService from './service'

routes.post(
  '/detail-room-hk/:kamarId',
  Authorization,
  asyncHandler(async function kerusakanKehilanganSave(
    req: Request,
    res: Response
  ) {
    const { kamarId } = req.getParams()
    const formData = req.getBody()
    const data = await RoomHKService.kerusakanKehilanganSave(
      kamarId,
      formData,
      req.token.data
    )
    const buildResponse = BuildResponse.created({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/detail-room-linen',
  Authorization,
  asyncHandler(async function kerusakanKehilanganSave(
    req: Request,
    res: Response
  ) {
    const formData = req.getBody()
    const data = await RoomHKService.createLinenSupply(formData, req.token.data)
    const buildResponse = BuildResponse.created({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.put(
  '/detail-room-linen/:detailLinenSupplyId',
  Authorization,
  asyncHandler(async function kerusakanKehilanganSave(
    req: Request,
    res: Response
  ) {
    const formData = req.getBody()
    const { detailLinenSupplyId } = req.getParams()
    const transaction = await req.getTransaction()
    const data = await RoomHKService.updateLinenSupply(
      detailLinenSupplyId,
      formData,
      transaction,
      req.token.data
    )
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/amenity-hk',
  Authorization,
  asyncHandler(async function getDetailLeader(req: Request, res: Response) {
    const formData = req.getBody()
    const transaction = await req.getTransaction()

    const data = await RoomHKService.createAmenity(
      formData,
      req.token.data,
      transaction
    )
    await transaction.commit()

    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.put(
  '/amenity-hk/:id',
  Authorization,
  asyncHandler(async function getDetailLeader(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const data = await RoomHKService.updateAmenities(
      id,
      formData,
      req.token.data,
      transaction
    )
    await transaction.commit()
    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/lost-and-found',
  Authorization,
  asyncHandler(async function getDetailLeader(req: Request, res: Response) {
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const data = await RoomHKService.createLostAndFound(
      formData,
      req.token.data,
      transaction
    )
    await transaction.commit()
    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.put(
  '/lost-and-found/:id',
  Authorization,
  asyncHandler(async function getDetailLeader(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const data = await RoomHKService.updateLostAndFound(
      id,
      formData,
      req.token.data,
      transaction
    )
    await transaction.commit()
    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.put(
  '/update-status-kamar/:kamarId',
  Authorization,
  asyncHandler(async function getDetailLeader(req: Request, res: Response) {
    const { kamarId } = req.getParams()
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const data = await RoomHKService.updateStatusKamar(
      kamarId,
      formData,
      transaction
    )
    await transaction.commit()
    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/delete-amenity/:amenitySupplyId',
  Authorization,
  asyncHandler(async function getDetailLeader(req: Request, res: Response) {
    const { amenitySupplyId } = req.getParams()
    await RoomHKService.deleteAmenities(amenitySupplyId, req.token.data)
    const buildResponse = BuildResponse.deleted({})

    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/lost-and-found/:id',
  Authorization,
  asyncHandler(async function getDetailLeader(req: Request, res: Response) {
    const { id } = req.getParams()
    await RoomHKService.deleteLostAndFound(id, req.token.data)
    const buildResponse = BuildResponse.deleted({})

    return res.status(200).json(buildResponse)
  })
)
