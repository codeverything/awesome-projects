/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization, { AuthorizationHK } from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import LogInventoryService from './service'

routes.get(
  '/log-inventory',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { message, data, total } = await LogInventoryService.getAll(req)
    const buildResponse = BuildResponse.get({ message, data, total })

    return res.status(200).json(buildResponse)
  })
)
