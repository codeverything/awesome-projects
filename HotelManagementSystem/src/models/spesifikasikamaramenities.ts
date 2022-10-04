// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'SpesifikasiKamarAmenities'

export interface SpesifikasiKamarAmenityAttributes {
  id: string
  jumlah?: number | any
  SpesifikasiKamarId: string | undefined
  AmenityId: string
  createdAt?: Date
  updatedAt?: Date
}

interface SpesifikasiKamarAmenityCreationAttributes
  extends Optional<SpesifikasiKamarAmenityAttributes, 'id'> {}

interface SpesifikasiKamarAmenityInstance
  extends Model<
      SpesifikasiKamarAmenityAttributes,
      SpesifikasiKamarAmenityCreationAttributes
    >,
    SpesifikasiKamarAmenityAttributes {}

const SpesifikasiKamarAmenity = db.sequelize.define<
  SpesifikasiKamarAmenityInstance
>(
  tableName,
  {
    ...SequelizeAttributes.old.SpesifikasiKamarAmenities,
  },
  { freezeTableName: true }
)

SpesifikasiKamarAmenity.associate = (models) => {
  SpesifikasiKamarAmenity.belongsTo(models.Amenity)
}

export default SpesifikasiKamarAmenity
