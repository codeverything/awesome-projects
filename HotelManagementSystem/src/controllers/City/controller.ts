/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import BuildResponse from 'modules/Response/BuildResponse'
import CityService from './service'

routes.get(
  '/city',
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { message, data, total } = await CityService.getAll(req)
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/city/:id',
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()

    const data = await CityService.getOne(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/city',
  // Authorization,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()

    const data = await CityService.create(formData)
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)

routes.put(
  '/city/:id',
  //   Authorization,
  asyncHandler(async function updateData(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()

    const data = await CityService.update(id, formData)
    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/city/:id',
  //   Authorization,
  asyncHandler(async function deleteData(req: Request, res: Response) {
    const { id } = req.getParams()

    await CityService.delete(id)
    const buildResponse = BuildResponse.deleted({})

    return res.status(200).json(buildResponse)
  })
)
