// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterKewarganegaraans'
export interface MasterKewarganegaraanAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterKewarganegaraanCreationAttributes
  extends Optional<MasterKewarganegaraanAttributes, 'id'> {}

interface MasterKewarganegaraanInstance
  extends Model<
      MasterKewarganegaraanAttributes,
      MasterKewarganegaraanCreationAttributes
    >,
    MasterKewarganegaraanAttributes {}

const MasterKewarganegaraan = db.sequelize.define<
  MasterKewarganegaraanInstance
>(tableName, {
  ...SequelizeAttributes.old.MasterKewarganegaraans,
})

export default MasterKewarganegaraan
