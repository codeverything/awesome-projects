// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'Calendars'

export interface CalendarAttributes {
  id: string
  date: Date
  createdAt?: Date
  updatedAt?: Date
}

interface CalendarCreationAttributes
  extends Optional<CalendarAttributes, 'id'> {}

interface CalendarInstance
  extends Model<CalendarAttributes, CalendarCreationAttributes>,
    CalendarAttributes {}

const Calendar = db.sequelize.define<CalendarInstance>(tableName, {
  ...SequelizeAttributes.old.Calendars,
})

export default Calendar
