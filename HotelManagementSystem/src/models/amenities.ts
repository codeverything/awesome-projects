// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'Amenities'

export interface AmenitieAttributes {
  id?: string
  idItem?: string
  nama?: string
  jumlah?: number | any
  createdAt?: Date
  updatedAt?: Date
}

interface AmenitieCreationAttributes
  extends Optional<AmenitieAttributes, 'id'> {}

interface AmenitieInstance
  extends Model<AmenitieAttributes, AmenitieCreationAttributes>,
    AmenitieAttributes {}

const Amenitie = db.sequelize.define<AmenitieInstance>(tableName, {
  ...SequelizeAttributes.old.Amenities,
})

export default Amenitie
