// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'RoutePermissions'
export interface RuanganAttributes {
  id: string
  MasterRuanganId: string
  MasterTipeRuanganId: string
  createdAt?: Date
  updatedAt?: Date
}

interface RuanganCreationAttributes extends Optional<RuanganAttributes, 'id'> {}

interface RuanganInstance
  extends Model<RuanganAttributes, RuanganCreationAttributes>,
    RuanganAttributes {}

const Ruangan = db.sequelize.define<RuanganInstance>(tableName, {
  ...SequelizeAttributes.old.Ruangans,
})

export default Ruangan
