// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterFungsiRuangans'

export interface MasterFungsiRuanganAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterFungsiRuanganCreationAttributes
  extends Optional<MasterFungsiRuanganAttributes, 'id'> {}

interface MasterFungsiRuanganInstance
  extends Model<
      MasterFungsiRuanganAttributes,
      MasterFungsiRuanganCreationAttributes
    >,
    MasterFungsiRuanganAttributes {}

const MasterFungsiRuangan = db.sequelize.define<MasterFungsiRuanganInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterFungsiRuangans,
  }
)

export default MasterFungsiRuangan
