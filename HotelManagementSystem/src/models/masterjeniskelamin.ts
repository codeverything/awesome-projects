// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterJenisKelamins'
export interface MasterJenisKelaminAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterJenisKelaminCreationAttributes
  extends Optional<MasterJenisKelaminAttributes, 'id'> {}

interface MasterJenisKelaminInstance
  extends Model<
      MasterJenisKelaminAttributes,
      MasterJenisKelaminCreationAttributes
    >,
    MasterJenisKelaminAttributes {}

const MasterJenisKelamin = db.sequelize.define<MasterJenisKelaminInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterJenisKelamins,
  }
)

export default MasterJenisKelamin
