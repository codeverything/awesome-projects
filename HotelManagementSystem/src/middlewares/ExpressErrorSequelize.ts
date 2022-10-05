/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { EmptyResultError, BaseError, ValidationError } from 'sequelize'
import { get } from 'lodash'
import fs from 'fs'
import ResponseError from 'modules/Response/ResponseError'

function msg(message: string) {
  return `Sequelize Error: ${message}`
}

async function ExpressErrorSequelize(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await req.rollbackTransactions()
    // eslint-disable-next-line no-empty
  } catch (e) {}

  if (err instanceof BaseError) {
    if (err instanceof EmptyResultError) {
      return res.status(404).json({
        code: 404,
        message: msg('Data not found'),
      })
    }

    if (err instanceof ValidationError) {
      console.log('ERROR SEQUELIZE VALIDATION!!!')
      const errors: any[] = get(err, 'errors', [])
      const errorMessage = get(errors, '0.message', null)

      const dataError = {
        code: 400,
        message: errorMessage
          ? `Validation error: ${errorMessage}`
          : err.message,
        errors: errors.reduce<any>((acc, curVal) => {
          acc[curVal.path] = curVal.message
          return acc
        }, {}),
      }
      // Jika terjadi error pada saat hapus file
      if (
        req.getBody().fileIdentitas &&
        req.getBody().fileIdentitas !== 'null'
      ) {
        fs.unlink(req.getBody().fileIdentitas.path, (err) => {
          if (err) throw new ResponseError.BadRequest('Unknown Error Occured')
          console.log('File Has Been Deleted')
        })
      } else if (
        req.getBody().fileBuktiMenikah &&
        req.getBody().fileBuktiMenikah !== 'null'
      ) {
        fs.unlink(req.getBody().fileBuktiMenikah.path, (err) => {
          if (err) throw new ResponseError.BadRequest('Unknown Error Occured')
          console.log('File Has Been Deleted')
        })
      }
      if (req.getBody().profileHotel) {
        fs.unlink(req.getBody().profileHotel.path, (err) => {
          if (err) throw new ResponseError.BadRequest('Unknown Error Occured')
          console.log('File Has Been Deleted')
        })
      }

      return res.status(400).json(dataError)
    }

    return res.status(500).json({
      code: 500,
      message: msg(err.message),
    })
  }

  next(err)
}

export default ExpressErrorSequelize
