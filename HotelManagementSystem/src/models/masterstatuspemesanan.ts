// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterStatusPemesanans'
export interface MasterStatusPemesananAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterStatusPemesananCreationAttributes
  extends Optional<MasterStatusPemesananAttributes, 'id'> {}

interface MasterStatusPemesananInstance
  extends Model<
      MasterStatusPemesananAttributes,
      MasterStatusPemesananCreationAttributes
    >,
    MasterStatusPemesananAttributes {}

const MasterStatusPemesanan = db.sequelize.define<
  MasterStatusPemesananInstance
>(tableName, {
  ...SequelizeAttributes.old.MasterStatusPemesanans,
})

export default MasterStatusPemesanan
