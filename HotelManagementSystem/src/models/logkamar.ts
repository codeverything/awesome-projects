import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { MasterStatusHKAttributes } from './masterstatushk'

import db from './_instance'

const tableName = 'LogKamars'
export interface LogKamarAttributes {
  id?: string
  KamarId?: string | undefined
  MasterStatusHKId?: string
  MasterStatusHK?: MasterStatusHKAttributes
  createdAt?: Date
  updatedAt?: Date
}

interface LogKamarCreationAttributes
  extends Optional<LogKamarAttributes, 'id'> {}

interface LogKamarInstance
  extends Model<LogKamarAttributes, LogKamarCreationAttributes>,
    LogKamarAttributes {}

const LogKamar = db.sequelize.define<LogKamarInstance>(tableName, {
  ...SequelizeAttributes.old.LogKamars,
})

LogKamar.associate = (models) => {
  LogKamar.belongsTo(models.MasterStatusHK)
}

export default LogKamar
