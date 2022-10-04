/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import HomeService from './service'

routes.get(
  '/home',
  asyncHandler(async function getAll(req: Request, res: Response) {
    const data = await HomeService.getCountAll(req)
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)
routes.post(
  '/generate-excel',
  // Authorization,
  asyncHandler(async function generateExcell(req: Request, res: Response) {
    const formData = req.getBody()
    const { data, titleCSV } = await HomeService.generateDataExcell(formData)
    // set Header untuk dapat generate excel kirim ke front end berupa type BLOB
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${titleCSV}.xlsx`
    )
    const excel = await HomeService.excelGenerate(data)
    res.setHeader('Content-Length', excel.length)
    return res.send(excel)
  })
)
