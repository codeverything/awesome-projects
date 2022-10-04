import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import BuildResponse from 'modules/Response/BuildResponse'
import InformasiKamarService from './service'

routes.post(
  '/check-available',
  asyncHandler(async function checkAvailable(req: Request, res: Response) {
    const formData = req.getBody()
    const { data } = await InformasiKamarService.checkAvailable(formData)
    const buildResponse = BuildResponse.checked(data)
    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/calculate/reservasi-kamar',
  asyncHandler(async function calculateReservasi(req: Request, res: Response) {
    const formData = req.getBody()
    const data = await InformasiKamarService.calculateReservasi(formData)
    const buildResponse = BuildResponse.checked({ data })
    return res.status(200).json(buildResponse)
  })
)
routes.put(
  '/edit-harga/:spesifikasiId',
  asyncHandler(async function editHarga(req: Request, res: Response) {
    const { spesifikasiId } = req.getParams()
    const formData = req.getBody()
    const data = await InformasiKamarService.editHarga(spesifikasiId, formData)
    const buildResponse = BuildResponse.get({ data })
    return res.status(200).json(buildResponse)
  })
)
