// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterItemTagihans'
export interface MasterItemTagihanAttributes {
  id: string
  nama: string
  satuan: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterItemTagihanCreationAttributes
  extends Optional<MasterItemTagihanAttributes, 'id'> {}

interface MasterItemTagihanInstance
  extends Model<
      MasterItemTagihanAttributes,
      MasterItemTagihanCreationAttributes
    >,
    MasterItemTagihanAttributes {}

const MasterItemTagihan = db.sequelize.define<MasterItemTagihanInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterItemTagihans,
  }
)

export default MasterItemTagihan
