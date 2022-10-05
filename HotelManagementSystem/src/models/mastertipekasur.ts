// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterTipeKasurs'
export interface MasterTipeKasurAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterTipeKasurCreationAttributes
  extends Optional<MasterTipeKasurAttributes, 'id'> {}

interface MasterTipeKasurInstance
  extends Model<MasterTipeKasurAttributes, MasterTipeKasurCreationAttributes>,
    MasterTipeKasurAttributes {}

const MasterTipeKasur = db.sequelize.define<MasterTipeKasurInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterTipeKasurs,
  }
)

export default MasterTipeKasur
