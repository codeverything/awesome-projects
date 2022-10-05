// eslint-disable-next-line no-unused-vars
import { NextFunction, Request, Response } from 'express'
import { ValidationError } from 'yup'
import fs from 'fs'
import ResponseError from 'modules/Response/ResponseError'
import { isString } from 'lodash'

async function ExpressErrorYup(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ValidationError) {
    console.log('ERROR YUP VALIDATION!!!')
    const error = {
      code: 422,
      message: err.errors.join(`, `) || 'Yup Validation Error !',
      errors:
        err.inner.length > 0
          ? err.inner.reduce((acc: any, curVal: any) => {
              acc[`${curVal.path}`] = curVal.message || curVal.type
              return acc
            }, {})
          : { [`${err.path}`]: err.message || err.type },
    }
    if (req.getBody().fileIdentitas && req.getBody().fileIdentitas !== 'null') {
      fs.unlink(req.getBody().fileIdentitas.path, (err) => {
        if (err) throw new ResponseError.BadRequest('Unknown Error Occured')
        console.log('File Has Been Deleted')
      })
    } else if (
      req.getBody().fileBuktiMenikah &&
      req.getBody().fileBuktiMenikah !== 'null'
    ) {
      if (isString(req.getBody().fileBuktiMenikah)) {
        fs.unlink(req.getBody().fileBuktiMenikah, (err) => {
          if (err) throw new ResponseError.BadRequest('Unknown Error Occured')
          console.log('File Has Been Deleted')
        })
      } else {
        fs.unlink(req.getBody().fileBuktiMenikah.path, (err) => {
          if (err) throw new ResponseError.BadRequest('Unknown Error Occured')
          console.log('File Has Been Deleted')
        })
      }
    }
    if (req.getBody().profileHotel && req.getBody().profileHotel !== 'null') {
      fs.unlink(req.getBody().profileHotel.path, (err) => {
        if (err) throw new ResponseError.BadRequest('Unknown Error Occured')
        console.log('File Has Been Deleted')
      })
    }
    if (
      req.getBody().imagePath &&
      req.getBody().imagePath !== 'null' &&
      !isString(req.getBody().imagePath)
    ) {
      fs.unlink(req.getBody().imagePath.path, (err) => {
        if (err) throw new ResponseError.BadRequest('Unknown Error Occured')
        console.log('File Has Been Deleted')
      })
    }

    return res.status(422).json(error)
  }
  next(err)
}

export default ExpressErrorYup
