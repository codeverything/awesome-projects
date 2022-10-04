// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterSatuans'
export interface MasterSatuanAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterSatuanCreationAttributes
  extends Optional<MasterSatuanAttributes, 'id'> {}

interface MasterSatuanInstance
  extends Model<MasterSatuanAttributes, MasterSatuanCreationAttributes>,
    MasterSatuanAttributes {}

const MasterSatuan = db.sequelize.define<MasterSatuanInstance>(tableName, {
  ...SequelizeAttributes.old.MasterSatuans,
})

export default MasterSatuan
