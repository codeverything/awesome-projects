// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterStatusPerkawinans'
export interface MasterStatusPerkawinanAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterStatusPerkawinanCreationAttributes
  extends Optional<MasterStatusPerkawinanAttributes, 'id'> {}

interface MasterStatusPerkawinanInstance
  extends Model<
      MasterStatusPerkawinanAttributes,
      MasterStatusPerkawinanCreationAttributes
    >,
    MasterStatusPerkawinanAttributes {}

const MasterStatusPerkawinan = db.sequelize.define<
  MasterStatusPerkawinanInstance
>(tableName, {
  ...SequelizeAttributes.old.MasterStatusPerkawinans,
})

export default MasterStatusPerkawinan
