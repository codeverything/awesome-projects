// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterTipeBarangs'
export interface MasterTipeBarangAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterTipeBarangCreationAttributes
  extends Optional<MasterTipeBarangAttributes, 'id'> {}

interface MasterTipeBarangInstance
  extends Model<MasterTipeBarangAttributes, MasterTipeBarangCreationAttributes>,
    MasterTipeBarangAttributes {}

const MasterTipeBarang = db.sequelize.define<MasterTipeBarangInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterTipeBarangs,
  },
  { freezeTableName: true }
)

export default MasterTipeBarang
