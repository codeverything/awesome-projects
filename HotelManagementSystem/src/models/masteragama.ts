// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterAgamas'
export interface MasterAgamaAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterAgamaCreationAttributes
  extends Optional<MasterAgamaAttributes, 'id'> {}

interface MasterAgamaInstance
  extends Model<MasterAgamaAttributes, MasterAgamaCreationAttributes>,
    MasterAgamaAttributes {}

const MasterAgama = db.sequelize.define<MasterAgamaInstance>(tableName, {
  ...SequelizeAttributes.old.MasterAgamas,
})

export default MasterAgama
