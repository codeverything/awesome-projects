// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterPenghitungans'
export interface MasterPenghitunganAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterPenghitunganCreationAttributes
  extends Optional<MasterPenghitunganAttributes, 'id'> {}

interface MasterPenghitunganInstance
  extends Model<
      MasterPenghitunganAttributes,
      MasterPenghitunganCreationAttributes
    >,
    MasterPenghitunganAttributes {}

const MasterPenghitungan = db.sequelize.define<MasterPenghitunganInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterPenghitungans,
  }
)

export default MasterPenghitungan
