// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterStatusTagihans'
export interface MasterStatusTagihanAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterStatusTagihanCreationAttributes
  extends Optional<MasterStatusTagihanAttributes, 'id'> {}

interface MasterStatusTagihanInstance
  extends Model<
      MasterStatusTagihanAttributes,
      MasterStatusTagihanCreationAttributes
    >,
    MasterStatusTagihanAttributes {}

const MasterStatusTagihan = db.sequelize.define<MasterStatusTagihanInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterStatusTagihans,
  }
)

export default MasterStatusTagihan
