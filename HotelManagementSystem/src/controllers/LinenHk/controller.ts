/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization, {
  AuthorizationHK,
  AuthorizationHKStaff,
} from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import LinenHkServeice from './service'
import mainValidate from './mainValidate'

routes.post(
  '/linen-laundry',
  Authorization,
  asyncHandler(async function kerusakanKehilanganSave(
    req: Request,
    res: Response
  ) {
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const data = await LinenHkServeice.createLinenLaundry(
      formData,
      req.token.data,
      transaction
    )
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.put(
  '/update-stock-linen/:id',
  Authorization,
  asyncHandler(async function updateLinen(req: Request, res: Response) {
    const formData = req.getBody()
    const { id } = req.getParams()
    const transaction = await req.getTransaction()
    const data = await LinenHkServeice.updateStockLinen(
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

routes.put(
  '/linen-laundry/:id',
  Authorization,
  asyncHandler(async function updateLinen(req: Request, res: Response) {
    const formData = req.getBody()
    const { id } = req.getParams()
    const transaction = await req.getTransaction()
    const data = await LinenHkServeice.updateLinen(
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

routes.delete(
  '/linen-laundry/:id',
  Authorization,
  mainValidate.validateData,
  asyncHandler(async function updateLinen(req: Request, res: Response) {
    await LinenHkServeice.deleteLinenLaundry(
      req.token.data,
      req.getState('data')
    )
    const buildResponse = BuildResponse.deleted({})

    return res.status(200).json(buildResponse)
  })
)
