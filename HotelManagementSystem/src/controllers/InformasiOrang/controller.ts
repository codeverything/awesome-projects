/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import multer from 'modules/ConfigMulter'
import InformasiOrangService from './service'

const upload = multer.fields([
  { name: 'fileIdentitas', maxCount: 1 },
  { name: 'fileBuktiMenikah', maxCount: 1 },
])
const setFileToBody = asyncHandler(async function setFileToBody(
  req: Request,
  res,
  next: NextFunction
) {
  const objFile = req.pickSingleFieldMulter([
    'fileIdentitas',
    'fileBuktiMenikah',
  ])
  req.setBody(objFile)
  next()
})

routes.get(
  '/informasi-orang',
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { data, total } = await InformasiOrangService.getAll(req)
    const buildResponse = BuildResponse.get({ data, total })
    return res.status(200).json(buildResponse)
  })
)
routes.get(
  '/informasi-orang/:id',
  asyncHandler(async function getOne(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await InformasiOrangService.getOne(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)
routes.post(
  '/informasi-orang',
  upload,
  setFileToBody,
  asyncHandler(async function create(req: Request, res: Response) {
    const formData = { ...req.getBody() }
    formData.dataString = JSON.parse(formData.dataString)
    const transaction = await req.getTransaction()
    const data = await InformasiOrangService.create(formData, transaction)
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })
    return res.status(200).json(buildResponse)
  })
)
routes.put(
  '/informasi-orang/:id',
  upload,
  setFileToBody,
  asyncHandler(async function update(req: Request, res: Response) {
    const { id } = req.getParams()
    const formData = { ...req.getBody() }
    formData.dataString = JSON.parse(formData.dataString)

    const transaction = await req.getTransaction()
    const data = await InformasiOrangService.update(id, formData, transaction)
    await transaction.commit()

    const buildResponse = BuildResponse.created({ data })
    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/informasi-orang/:id',
  asyncHandler(async function destroy(req: Request, res: Response) {
    const { id } = req.getParams()
    await InformasiOrangService.delete(id)

    const buildResponse = BuildResponse.deleted({})
    return res.status(200).json(buildResponse)
  })
)
