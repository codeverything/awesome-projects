// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'Shifts'
export interface ShiftAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface ShiftCreationAttributes extends Optional<ShiftAttributes, 'id'> {}

interface ShiftInstance
  extends Model<ShiftAttributes, ShiftCreationAttributes>,
    ShiftAttributes {}

const Shift = db.sequelize.define<ShiftInstance>(tableName, {
  ...SequelizeAttributes.old.Shifts,
})

Shift.associate = (models) => {
  Shift.hasOne(models.LogWaktuShift)
}

export default Shift
