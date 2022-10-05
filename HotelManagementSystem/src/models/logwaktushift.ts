// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'LogWaktuShifts'
export interface LogWaktuShiftAttributes {
  id: string
  waktuMulai: Date
  waktuSelesai: Date
  ShiftId: string
  createdAt?: Date
  updatedAt?: Date
}

interface LogWaktuShiftCreationAttributes
  extends Optional<LogWaktuShiftAttributes, 'id'> {}

interface LogWaktuShiftInstance
  extends Model<LogWaktuShiftAttributes, LogWaktuShiftCreationAttributes>,
    LogWaktuShiftAttributes {}

const LogWaktuShift = db.sequelize.define<LogWaktuShiftInstance>(tableName, {
  ...SequelizeAttributes.old.LogWaktuShifts,
})

export default LogWaktuShift
