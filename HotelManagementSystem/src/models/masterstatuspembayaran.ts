// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterStatusPembayarans'

export interface MasterStatusPembayaranAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterStatusPembayaranCreationAttributes
  extends Optional<MasterStatusPembayaranAttributes, 'id'> {}

interface MasterStatusPembayaranInstance
  extends Model<
      MasterStatusPembayaranAttributes,
      MasterStatusPembayaranCreationAttributes
    >,
    MasterStatusPembayaranAttributes {}

const MasterStatusPembayaran = db.sequelize.define<
  MasterStatusPembayaranInstance
>(tableName, {
  ...SequelizeAttributes.old.MasterStatusPembayarans,
})

export default MasterStatusPembayaran
