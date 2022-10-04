import { NextFunction, Request, Response } from 'express'
import useValidation from 'helpers/useValidation'
import { currentToken, verifyToken } from 'helpers/Token'
import { updateProfile } from './schema'
import AuthService from './service'

const validateData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const getToken = currentToken(req)
  const token = verifyToken(getToken) as any
  useValidation(updateProfile, req.getBody())
  const data = await AuthService.profile(token)
  req.setState({
    data,
    formData: req.getBody(),
  })
  next()
}
export default { validateData }
