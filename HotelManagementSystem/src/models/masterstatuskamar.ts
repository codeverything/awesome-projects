// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterStatusKamars'

export interface MasterStatusKamarAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterStatusKamarCreationAttributes
  extends Optional<MasterStatusKamarAttributes, 'id'> {}

interface MasterStatusKamarInstance
  extends Model<
      MasterStatusKamarAttributes,
      MasterStatusKamarCreationAttributes
    >,
    MasterStatusKamarAttributes {}

const MasterStatusKamar = db.sequelize.define<MasterStatusKamarInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterStatusKamars,
  }
)

export default MasterStatusKamar
