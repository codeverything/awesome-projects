// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterTipeTamus'
export interface MasterTipeTamuAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterTipeTamuCreationAttributes
  extends Optional<MasterTipeTamuAttributes, 'id'> {}

interface MasterTipeTamuInstance
  extends Model<MasterTipeTamuAttributes, MasterTipeTamuCreationAttributes>,
    MasterTipeTamuAttributes {}

const MasterTipeTamu = db.sequelize.define<MasterTipeTamuInstance>(tableName, {
  ...SequelizeAttributes.old.MasterTipeTamus,
})

export default MasterTipeTamu
