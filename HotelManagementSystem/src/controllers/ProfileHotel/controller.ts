/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import multer from 'modules/ConfigMulter'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import { MulterError } from 'multer'
import ProfileHotelService from './service'

const uploadFile = multer.fields([{ name: 'profileHotel', maxCount: 1 }])
function upload(req: Request, res: Response, next: NextFunction) {
  uploadFile(req, res, function (err: any) {
    if (err instanceof MulterError) {
      res
        .status(400)
        .json({ message: 'Mohon Upload File Yang Kurang Dari 2mb' })
    } else if (err) {
      res.status(400).json({ message: err.message })
    }
    next()
  })
}
const setFileToBody = asyncHandler(async function setFileToBody(
  req: Request,
  res,
  next: NextFunction
) {
  const objFile = req.pickSingleFieldMulter(['profileHotel'])
  req.setBody(objFile)
  next()
})

routes.get(
  '/profile-hotel',
  asyncHandler(async function getAll(req: Request, res: Response) {
    const data = await ProfileHotelService.getOne()
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.get(
  '/profile-hotel/:id',
  Authorization,
  asyncHandler(async function getAll(req: Request, res: Response) {
    const { id } = req.getParams()
    const data = await ProfileHotelService.getDetail(id)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.post(
  '/profile-hotel',
  upload,
  setFileToBody,
  Authorization,
  asyncHandler(async function createData(req: Request, res: Response) {
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const data = await ProfileHotelService.create(formData, transaction)
    await transaction.commit()
    const buildResponse = BuildResponse.created({ data })

    return res.status(201).json(buildResponse)
  })
)

routes.put(
  '/profile-hotel',
  Authorization,
  upload,
  setFileToBody,
  asyncHandler(async function updateData(req: Request, res: Response) {
    const formData = req.getBody()
    const transaction = await req.getTransaction()
    const data = await ProfileHotelService.update(formData, transaction)
    const buildResponse = BuildResponse.updated({ data })
    await transaction.commit()

    return res.status(200).json(buildResponse)
  })
)

routes.delete(
  '/profile-hotel/:id',
  Authorization,
  asyncHandler(async function deleteData(req: Request, res: Response) {
    const { id } = req.getParams()

    await ProfileHotelService.delete()
    const buildResponse = BuildResponse.deleted({})

    return res.status(200).json(buildResponse)
  })
)
