// eslint-disable-next-line no-unused-vars
import { ConstRole } from 'constants/index'
import { NextFunction, Request, Response } from 'express'
import { currentToken, verifyToken } from 'helpers/Token'
import { isEmpty } from 'lodash'

async function Authorization(req: Request, res: Response, next: NextFunction) {
  const getToken = currentToken(req)
  const token = verifyToken(getToken)
  if (isEmpty(token?.data)) {
    return res.status(401).json({
      code: 401,
      message: token?.message,
    })
  }
  req.token = token
  next()
}

export default Authorization

export function AuthorizationFO(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    req.token.data.RoleId === ConstRole.FRONT_OFFICE ||
    req.token.data.RoleId === ConstRole.SUPERADMIN
  ) {
    return next()
  }
  return res.status(403).json({
    code: 403,
    message: 'Bukan Hak Akses Anda',
  })
}

export function AuthorizationHK(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    req.token.data.RoleId === ConstRole.HK_STAFF ||
    req.token.data.RoleId === ConstRole.HK_LEADER ||
    req.token.data.RoleId === ConstRole.SUPERADMIN
  ) {
    return next()
  }
  return res.status(403).json({
    code: 403,
    message: 'Bukan Hak Akses Anda',
  })
}

export function AuthorizationHKStaff(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    req.token.data.RoleId === ConstRole.HK_STAFF ||
    req.token.data.RoleId === ConstRole.SUPERADMIN
  ) {
    return next()
  }
  return res.status(403).json({
    code: 403,
    message: 'Bukan Hak Akses Anda',
  })
}

export function AuthorizationAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.token.data.RoleId === ConstRole.SUPERADMIN) {
    return next()
  }
  return res.status(403).json({
    code: 403,
    message: 'Bukan Hak Akses Anda',
  })
}
