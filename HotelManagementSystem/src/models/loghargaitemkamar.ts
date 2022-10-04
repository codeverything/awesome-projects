// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'LogHargaItemKamars'

export interface LogHargaItemKamarAttributes {
  id: string
  ItemKamarId: string
  harga: number
  createdAt?: Date
  updatedAt?: Date
}

interface LogHargaItemKamarCreationAttributes
  extends Optional<LogHargaItemKamarAttributes, 'id'> {}

interface LogHargaItemKamarInstance
  extends Model<
      LogHargaItemKamarAttributes,
      LogHargaItemKamarCreationAttributes
    >,
    LogHargaItemKamarAttributes {}

const LogHargaItemKamar = db.sequelize.define<LogHargaItemKamarInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.LogHargaItemKamars,
  }
)

export default LogHargaItemKamar
