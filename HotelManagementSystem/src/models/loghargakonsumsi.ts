// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'LogHargaKonsumsis'

export interface LogHargaKonsumsiAttributes {
  id: string
  KonsumsiId: string
  harga: number
  createdAt?: Date
  updatedAt?: Date
}

interface LogHargaKonsumsiCreationAttributes
  extends Optional<LogHargaKonsumsiAttributes, 'id'> {}

interface LogHargaKonsumsiInstance
  extends Model<LogHargaKonsumsiAttributes, LogHargaKonsumsiCreationAttributes>,
    LogHargaKonsumsiAttributes {}

const LogHargaKonsumsi = db.sequelize.define<LogHargaKonsumsiInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.LogHargaKonsumsis,
  },
  { freezeTableName: true }
)

export default LogHargaKonsumsi
