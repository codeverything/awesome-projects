// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { AmenitieAttributes } from './amenities'

import db from './_instance'

const tableName = 'AmenitySupplies'

export interface AmenitySupplyAttributes {
  id?: string
  AmenityId?: string | undefined
  nama?: string | undefined
  jumlah?: number | undefined
  KamarId?: string | undefined
  lastUpdate?: string | undefined
  ReservasiKamarId?: string | undefined
  Amenity?: AmenitieAttributes | undefined
  UserId?: string | undefined
  createdAt?: Date | undefined
  updatedAt?: Date | undefined
}

interface AmenitySupplyCreationAttributes
  extends Optional<AmenitySupplyAttributes, 'id'> {}

interface AmenitySupplyInstance
  extends Model<AmenitySupplyAttributes, AmenitySupplyCreationAttributes>,
    AmenitySupplyAttributes {}

const AmenitySupply = db.sequelize.define<AmenitySupplyInstance>(tableName, {
  ...SequelizeAttributes.old.AmenitySupplies,
})

AmenitySupply.associate = (models) => {
  AmenitySupply.belongsTo(models.Amenity)
}
export default AmenitySupply
