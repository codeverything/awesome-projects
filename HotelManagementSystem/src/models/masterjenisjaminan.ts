// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterJenisJaminans'
export interface MasterJenisJaminanAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterJenisJaminanCreationAttributes
  extends Optional<MasterJenisJaminanAttributes, 'id'> {}

interface MasterJenisJaminanInstance
  extends Model<
      MasterJenisJaminanAttributes,
      MasterJenisJaminanCreationAttributes
    >,
    MasterJenisJaminanAttributes {}

const MasterJenisJaminan = db.sequelize.define<MasterJenisJaminanInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterJenisJaminans,
  }
)

export default MasterJenisJaminan
