/* eslint-disable no-unused-vars */
import multer from 'multer'
import { Request, Express } from 'express'
import { extname } from 'path'
import ResponseError from 'modules/Response/ResponseError'

const maxSize = 2 * 1024 * 1024
const storage = multer.diskStorage({
  destination: 'public/uploads/',
  filename(req: Request, file: Express.Multer.File, cb): void {
    cb(null, [Date.now(), file.originalname].join('-'))
  },
})

const ConfigMulter = multer({
  storage,
  limits: { fileSize: maxSize },
})

export default ConfigMulter
