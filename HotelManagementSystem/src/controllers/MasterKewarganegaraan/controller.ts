/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import MasterKewarganegaraanService from './service'

routes.get(
  '/master-kewarganegaraan',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { message, data, total } = await MasterKewarganegaraanService.getAll(
      req
    )
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/master-kewarganegaraan/:id',
  Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()

    const data = await MasterKewarganegaraanService.getOne(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/master-kewarganegaraan',
  Authorization,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()

    const data = await MasterKewarganegaraanService.create(formData)
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)

routes.put(
  '/master-kewarganegaraan/:id',
  Authorization,
  asyncHandler(async function updateData(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()

    const data = await MasterKewarganegaraanService.update(id, formData)
    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/master-kewarganegaraan/:id',
  Authorization,
  asyncHandler(async function deleteData(req: Request, res: Response) {
    const { id } = req.getParams()

    await MasterKewarganegaraanService.delete(id)
    const buildResponse = BuildResponse.deleted({})

    return res.status(200).json(buildResponse)
  })
)
