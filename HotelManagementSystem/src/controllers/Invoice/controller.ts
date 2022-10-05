/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import InvoiceService from './service'

routes.post(
  '/invoice-refund/:reservasiId',
  Authorization,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const { reservasiId } = req.getParams()
    const data = await InvoiceService.createInvoiceRefund(
      reservasiId,
      formData,
      transaction
    )
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)

routes.post(
  '/invoice-pembayaran/:reservasiId',
  Authorization,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()
    const { reservasiId } = req.getParams()
    const transaction = await req.getTransaction()
    const data = await InvoiceService.createInvoicePembayaran(
      reservasiId,
      formData,
      transaction
    )
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)

routes.post(
  '/invoice-tambahan/:reservasiId',
  Authorization,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const { reservasiId } = req.getParams()
    const data = await InvoiceService.createInvoiceTagihan(
      reservasiId,
      formData,
      transaction
    )
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)
