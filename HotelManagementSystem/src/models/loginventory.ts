// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { MasterCategoryAttributes } from './mastercategory'
import { MasterJenisInventoryAttributes } from './masterjenisinventory'

import db from './_instance'

const tableName = 'LogInventories'

export interface LogInventoryAttributes {
  id?: string
  namaInventory?: string
  MasterJenisInventoryId?: string
  MasterCategoryId?: string
  log?: string
  jumlah?: number | any
  keterangan?: string
  penanggungJawab?: string
  createdAt?: Date
  updatedAt?: Date
}

interface LogInventoryCreationAttributes
  extends Optional<LogInventoryAttributes, 'id'> {}

interface LogInventoryInstance
  extends Model<LogInventoryAttributes, LogInventoryCreationAttributes>,
    LogInventoryAttributes {
  MasterCategory: MasterCategoryAttributes
  MasterJenisInventory: MasterJenisInventoryAttributes
}

const LogLinen = db.sequelize.define<LogInventoryInstance>(tableName, {
  ...SequelizeAttributes.old.LogInventories,
})
LogLinen.associate = (models) => {
  LogLinen.belongsTo(models.MasterCategory)
  LogLinen.belongsTo(models.MasterJenisInventory)
}
export default LogLinen
