// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterSetupRuangans'

export interface MasterSetupRuanganAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterSetupRuanganCreationAttributes
  extends Optional<MasterSetupRuanganAttributes, 'id'> {}

interface MasterSetupRuanganInstance
  extends Model<
      MasterSetupRuanganAttributes,
      MasterSetupRuanganCreationAttributes
    >,
    MasterSetupRuanganAttributes {}

const MasterSetupRuangan = db.sequelize.define<MasterSetupRuanganInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterSetupRuangans,
  }
)

export default MasterSetupRuangan
