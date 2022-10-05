// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'LogCheckers'

export interface LogCheckerAttributes {
  id: string
  nama: string
  KamarId: string
  ReservasiKamarId?: string
  ReservasiKamarItemKamarId: string
  createdAt?: Date
  updatedAt?: Date
}

interface LogCheckerCreationAttributes
  extends Optional<LogCheckerAttributes, 'id'> {}

interface LogCheckerInstance
  extends Model<LogCheckerAttributes, LogCheckerCreationAttributes>,
    LogCheckerAttributes {}

const LogChecker = db.sequelize.define<LogCheckerInstance>(tableName, {
  ...SequelizeAttributes.old.LogCheckers,
})
LogChecker.associate = (models) => {
  LogChecker.belongsTo(models.Kamar)
}
export default LogChecker
