// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import { currentToken, verifyToken } from 'helpers/Token'
import Authorization from 'middlewares/Authorization'
import multer from 'modules/ConfigMulter'
import BuildResponse from 'modules/Response/BuildResponse'
import AuthService from './service'
import mainValidate from './mainValidation'

const upload = multer.fields([{ name: 'imagePath', maxCount: 1 }])

const setFileToBody = asyncHandler(async function setFileToBody(
  req: Request,
  res,
  next: NextFunction
) {
  const objFile = req.pickSingleFieldMulter(['imagePath'])
  req.setBody(objFile)
  next()
})

routes.post(
  '/auth/sign-up',
  asyncHandler(async function signUp(req: Request, res: Response) {
    const formData = req.getBody()

    const { message, data } = await AuthService.signUp(formData)
    const buildResponse = BuildResponse.get({ message, data })

    return res.status(201).json(buildResponse)
  })
)

routes.post(
  '/auth/sign-in',
  asyncHandler(async function signIn(req: Request, res: Response) {
    const formData = req.getBody()
    const {
      token,
      expiresIn,
      tokenType,
      defaultPage,
    } = await AuthService.signIn(formData)
    return res
      .cookie('token', token, {
        maxAge: Number(expiresIn) * 1000, // 7 Days
        httpOnly: true,
        path: '/v',
        secure: process.env.NODE_ENV === 'production',
      })
      .json({ Authorization: token, expiresIn, tokenType, defaultPage })
  })
)

routes.get(
  '/profile',
  Authorization,
  asyncHandler(async function getProfile(req: Request, res: Response) {
    const getToken = currentToken(req)
    const token = verifyToken(getToken)

    // @ts-ignore
    const data = await AuthService.profile(token)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)

routes.put(
  '/profile',
  Authorization,
  mainValidate.validateData,
  asyncHandler(async function updateProfile(req: Request, res: Response) {
    const transaction = await req.getTransaction()
    const state = req.getState('data')
    const formData = req.getState('formData')
    const data = await AuthService.editProfile(state, formData, transaction)
    const buildResponse = BuildResponse.updated({ data })
    await transaction.commit()
    return res.status(200).json(buildResponse)
  })
)

routes.put(
  '/change-image',
  Authorization,
  upload,
  setFileToBody,
  asyncHandler(async function updateProfile(req: Request, res: Response) {
    const transaction = await req.getTransaction()
    const getToken = currentToken(req)
    const token: any = verifyToken(getToken)
    const formData = req.getBody()
    const data = await AuthService.editImage(token, formData, transaction)
    const buildResponse = BuildResponse.updated({ data })
    await transaction.commit()
    return res.status(200).json(buildResponse)
  })
)
