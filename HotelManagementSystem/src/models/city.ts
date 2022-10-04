// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'Cities'
export interface CityAttributes {
  id: string
  nama: string
  latitude: string
  longitude: string
  geojson: string
  zoom: string
  ProvinsiId: string
  createdAt?: Date
  updatedAt?: Date
}

interface CityCreationAttributes extends Optional<CityAttributes, 'id'> {}

interface CityInstance
  extends Model<CityAttributes, CityCreationAttributes>,
    CityAttributes {}

const City = db.sequelize.define<CityInstance>(tableName, {
  ...SequelizeAttributes.old.Cities,
})

export default City
