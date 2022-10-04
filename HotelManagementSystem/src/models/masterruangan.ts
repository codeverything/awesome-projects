// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterRuangans'
export interface MasterRuanganAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterRuanganCreationAttributes
  extends Optional<MasterRuanganAttributes, 'id'> {}

interface MasterRuanganInstance
  extends Model<MasterRuanganAttributes, MasterRuanganCreationAttributes>,
    MasterRuanganAttributes {}

const MasterRuangan = db.sequelize.define<MasterRuanganInstance>(tableName, {
  ...SequelizeAttributes.old.MasterRuangans,
})

export default MasterRuangan
