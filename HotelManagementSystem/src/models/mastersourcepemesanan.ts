// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterSourcePemesanans'
export interface MasterSourcePemesananAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterSourcePemesananCreationAttributes
  extends Optional<MasterSourcePemesananAttributes, 'id'> {}

interface MasterSourcePemesananInstance
  extends Model<
      MasterSourcePemesananAttributes,
      MasterSourcePemesananCreationAttributes
    >,
    MasterSourcePemesananAttributes {}

const MasterSourcePemesanan = db.sequelize.define<
  MasterSourcePemesananInstance
>(tableName, {
  ...SequelizeAttributes.old.MasterSourcePemesanans,
})

export default MasterSourcePemesanan
