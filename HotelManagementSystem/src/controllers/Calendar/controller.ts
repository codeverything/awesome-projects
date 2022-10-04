/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import routes from 'routes/public'
import asyncHandler from 'helpers/asyncHandler'
import Authorization from 'middlewares/Authorization'
import BuildResponse from 'modules/Response/BuildResponse'
import CalendarService from './service'

routes.get(
  '/calendar/room-reservation',
  asyncHandler(async function checkPromo(req: Request, res: Response) {
    const { fromDate, toDate } = req.getQuery()
    const data = await CalendarService.getRoomReservationCalendar({
      fromDate,
      toDate,
    })
    const buildResponse = BuildResponse.get({ data })

    return res.status(200).json(buildResponse)
  })
)
