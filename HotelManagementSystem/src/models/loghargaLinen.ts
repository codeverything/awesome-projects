// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'LogHargaLinens'

export interface LogHargaLinenAttributes {
  id: string
  LinenId: string
  harga: number
  createdAt?: Date
  updatedAt?: Date
}

interface LogHargaLinenCreationAttributes
  extends Optional<LogHargaLinenAttributes, 'id'> {}

interface LogHargaLinenInstance
  extends Model<LogHargaLinenAttributes, LogHargaLinenCreationAttributes>,
    LogHargaLinenAttributes {}

const LogHargaLinen = db.sequelize.define<LogHargaLinenInstance>(tableName, {
  ...SequelizeAttributes.old.LogHargaLinens,
})

export default LogHargaLinen
