// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterStatusHKs'
export interface MasterStatusHKAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterStatusHKCreationAttributes
  extends Optional<MasterStatusHKAttributes, 'id'> {}

interface MasterStatusHKInstance
  extends Model<MasterStatusHKAttributes, MasterStatusHKCreationAttributes>,
    MasterStatusHKAttributes {}

const MasterStatusHK = db.sequelize.define<MasterStatusHKInstance>(tableName, {
  ...SequelizeAttributes.old.MasterStatusHKs,
})

export default MasterStatusHK
