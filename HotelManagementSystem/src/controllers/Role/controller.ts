/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import { currentToken, verifyToken } from 'helpers/Token'
import FilteredHakAksesService from './service.func'
import RoleService from './service'
import TemplateService from './service.template'

// Key Redis Cache

routes.get(
  '/role',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { message, data, total } = await RoleService.getAll(req)
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/template-role',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const data = TemplateService.getTemplate()
    const buildResponse = BuildResponse.get({ data })
    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/header',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const getToken = currentToken(req)
    const payload = verifyToken(getToken) as any
    const data = await FilteredHakAksesService.getHeader(payload?.data)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/list-route',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const getToken = currentToken(req)
    const payload = verifyToken(getToken) as any
    const data = await FilteredHakAksesService.getHeaderRoute(
      payload?.data,
      req
    )
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/role/:id',
  Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()

    const data = await RoleService.getOne(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/role',
  Authorization,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const data = await RoleService.create(formData, transaction)
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)

routes.put(
  '/role/:id',
  Authorization,
  asyncHandler(async function updateData(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = req.getBody()

    const data = await RoleService.update(id, formData)
    const buildResponse = BuildResponse.updated({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/role/:id',
  Authorization,
  asyncHandler(async function deleteData(req: Request, res: Response) {
    const { id } = req.getParams()

    await RoleService.delete(id)
    const buildResponse = BuildResponse.deleted({})

    return res.status(200).json(buildResponse)
  })
)
