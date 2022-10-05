/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import models from 'models'
import Authorization, { AuthorizationFO } from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import ReservasiService from './service'

const { ReservasiKamar } = models
routes.get(
  '/reservasi',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { message, data, total } = await ReservasiService.getAll(req)
    const buildResponse = BuildResponse.get({
      message,
      data,
      total,
    })
    return res.status(200).send(buildResponse)
  })
)

routes.get(
  '/reservasi-checkin-checkout',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const {
      message,
      data,
      total,
    } = await ReservasiService.getAllCheckinCheckout(req)
    const buildResponse = BuildResponse.get({
      message,
      data,
      total,
    })
    return res.status(200).send(buildResponse)
  })
)
routes.get(
  '/reservasi-invoice',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { message, data, total } = await ReservasiService.getAllInvoice(req)

    const buildResponse = BuildResponse.get({
      message,
      data,
      total,
    })
    return res.status(200).send(buildResponse)
  })
)

routes.get(
  '/reservasi-reserved',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { message, data, total } = await ReservasiService.getAllReserved(req)
    const buildResponse = BuildResponse.get({
      message,
      data,
      total,
    })
    return res.status(200).send(buildResponse)
  })
)

routes.get(
  '/reservasi/:id',
  Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await ReservasiService.getOne(id)
    const totalKamar = await ReservasiKamar.findAll({
      where: { ReservasiId: id },
    })
    const buildResponse = BuildResponse.get({
      data,
      totalKamar: totalKamar.length,
    })
    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/detail-invoice/:id',
  Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await ReservasiService.getDetailInvoice(id, false)
    const buildResponse = BuildResponse.get({
      data,
    })
    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/detail-cancel-reservasi/:id',
  Authorization,
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await ReservasiService.getBatalReservasiDetail(id)
    const buildResponse = BuildResponse.get({
      data,
    })
    return res.status(200).json(buildResponse)
  })
)
