// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterTipeKamars'
export interface MasterTipeKamarAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterTipeKamarCreationAttributes
  extends Optional<MasterTipeKamarAttributes, 'id'> {}

interface MasterTipeKamarInstance
  extends Model<MasterTipeKamarAttributes, MasterTipeKamarCreationAttributes>,
    MasterTipeKamarAttributes {}

const MasterTipeKamar = db.sequelize.define<MasterTipeKamarInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterTipeKamars,
  }
)

export default MasterTipeKamar
