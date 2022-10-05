// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterCategories'
export interface MasterCategoryAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterCategoryCreationAttributes
  extends Optional<MasterCategoryAttributes, 'id'> {}

interface MasterCategoryInstance
  extends Model<MasterCategoryAttributes, MasterCategoryCreationAttributes>,
    MasterCategoryAttributes {}

const MasterAgama = db.sequelize.define<MasterCategoryInstance>(tableName, {
  ...SequelizeAttributes.old.MasterCategories,
})

export default MasterAgama
