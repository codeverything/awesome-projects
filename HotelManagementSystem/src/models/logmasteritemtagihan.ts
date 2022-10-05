// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'LogMasterItemTagihans'
export interface LogMasterItemTagihanAttributes {
  id: string
  harga: number
  tanggalBerlaku: Date
  MasterItemTagihanId: string
  createdAt?: Date
  updatedAt?: Date
}

interface LogMasterItemTagihanCreationAttributes
  extends Optional<LogMasterItemTagihanAttributes, 'id'> {}

interface LogMasterItemTagihanInstance
  extends Model<
      LogMasterItemTagihanAttributes,
      LogMasterItemTagihanCreationAttributes
    >,
    LogMasterItemTagihanAttributes {}

const LogMasterItemTagihan = db.sequelize.define<LogMasterItemTagihanInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.LogMasterItemTagihans,
  }
)

export default LogMasterItemTagihan
