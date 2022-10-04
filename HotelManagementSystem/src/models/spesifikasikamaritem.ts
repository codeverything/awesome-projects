// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'SpesifikasiKamarItems'

export interface SpesifikasiKamarItemAttributes {
  id: string
  ItemKamarId: string
  jumlah?: number | any
  SpesifikasiKamarId: string
  createdAt?: Date
  updatedAt?: Date
}

interface SpesifikasiKamarItemCreationAttributes
  extends Optional<SpesifikasiKamarItemAttributes, 'id'> {}

interface SpesifikasiKamarItemInstance
  extends Model<
      SpesifikasiKamarItemAttributes,
      SpesifikasiKamarItemCreationAttributes
    >,
    SpesifikasiKamarItemAttributes {}

const SpesifikasiKamarItem = db.sequelize.define<SpesifikasiKamarItemInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.SpesifikasiKamarItems,
  }
)

export default SpesifikasiKamarItem
