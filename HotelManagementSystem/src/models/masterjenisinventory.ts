// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterJenisInventories'
export interface MasterJenisInventoryAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterJenisInventoryCreationAttributes
  extends Optional<MasterJenisInventoryAttributes, 'id'> {}

interface MasterJenisInventoryInstance
  extends Model<
      MasterJenisInventoryAttributes,
      MasterJenisInventoryCreationAttributes
    >,
    MasterJenisInventoryAttributes {}

const MasterItemPembayaran = db.sequelize.define<MasterJenisInventoryInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterJenisInventories,
  }
)

export default MasterItemPembayaran
