// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterTipeRuangans'
export interface MasterTipeRuanganAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterTipeRuanganCreationAttributes
  extends Optional<MasterTipeRuanganAttributes, 'id'> {}

interface MasterTipeRuanganInstance
  extends Model<
      MasterTipeRuanganAttributes,
      MasterTipeRuanganCreationAttributes
    >,
    MasterTipeRuanganAttributes {}

const MasterTipeRuangan = db.sequelize.define<MasterTipeRuanganInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterTipeRuangans,
  }
)

export default MasterTipeRuangan
