// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterTipeIdentitases'
export interface MasterTipeIdentitasAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterTipeIdentitasCreationAttributes
  extends Optional<MasterTipeIdentitasAttributes, 'id'> {}

interface MasterTipeIdentitasInstance
  extends Model<
      MasterTipeIdentitasAttributes,
      MasterTipeIdentitasCreationAttributes
    >,
    MasterTipeIdentitasAttributes {}

const MasterTipeIdentitas = db.sequelize.define<MasterTipeIdentitasInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterTipeIdentitases,
  },
  { freezeTableName: true }
)

export default MasterTipeIdentitas
