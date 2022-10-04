/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import models from 'models'
import asyncHandler from 'helpers/asyncHandler'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import KerusakanKehilanganService from './service'

routes.post(
  '/kerusakan-kehilangan/:id',
  asyncHandler(async function create(req: Request, res: Response) {
    const formData = req.getBody()
    const { id } = req.getParams()
    const data = await KerusakanKehilanganService.create(id, formData)
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)
