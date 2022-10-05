import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization, { AuthorizationHK } from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import AmenityHKService from './service'

routes.put(
  '/update-amenity-stock/:id',
  Authorization,
  asyncHandler(async function AmenityHkCreate(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const data = await AmenityHKService.updateStockAmenity(
      id,
      formData,
      req.token.data,
      transaction
    )
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })

    return res.status(200).json(buildResponse)
  })
)
