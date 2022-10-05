// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'SpesifikasiKamarLinens'

export interface SpesifikasiKamarLinenAttributes {
  id: string
  LinenId: string
  jumlah?: number | any
  SpesifikasiKamarId: string
  createdAt?: Date
  updatedAt?: Date
}

interface SpesifikasiKamarLinenCreationAttributes
  extends Optional<SpesifikasiKamarLinenAttributes, 'id'> {}

interface SpesifikasiKamarLinenInstance
  extends Model<
      SpesifikasiKamarLinenAttributes,
      SpesifikasiKamarLinenCreationAttributes
    >,
    SpesifikasiKamarLinenAttributes {}

const SpesifikasiKamarLinen = db.sequelize.define<
  SpesifikasiKamarLinenInstance
>(tableName, {
  ...SequelizeAttributes.old.SpesifikasiKamarLinens,
})

SpesifikasiKamarLinen.associate = (models) => {
  SpesifikasiKamarLinen.belongsTo(models.Linen)
}

export default SpesifikasiKamarLinen
