// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterTipePembayarans'
export interface MasterTipePembayaranAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterTipePembayaranCreationAttributes
  extends Optional<MasterTipePembayaranAttributes, 'id'> {}

interface MasterTipePembayaranInstance
  extends Model<
      MasterTipePembayaranAttributes,
      MasterTipePembayaranCreationAttributes
    >,
    MasterTipePembayaranAttributes {}

const MasterTipePembayaran = db.sequelize.define<MasterTipePembayaranInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterTipePembayarans,
  }
)

export default MasterTipePembayaran
