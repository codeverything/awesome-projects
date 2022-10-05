// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterItemPembayarans'
export interface MasterItemPembayaranAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterItemPembayaranCreationAttributes
  extends Optional<MasterItemPembayaranAttributes, 'id'> {}

interface MasterItemPembayaranInstance
  extends Model<
      MasterItemPembayaranAttributes,
      MasterItemPembayaranCreationAttributes
    >,
    MasterItemPembayaranAttributes {}

const MasterItemPembayaran = db.sequelize.define<MasterItemPembayaranInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterItemPembayarans,
  }
)

export default MasterItemPembayaran
