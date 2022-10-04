// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { MasterCategoryAttributes } from './mastercategory'

import db from './_instance'

const tableName = 'LogLinens'

export interface LogLinenAttributes {
  id: string
  activity: string
  jumlah: number | any
  LinenId: string | any
  namaStaff: string
  log: string
  MasterCategoryId: string
  createdAt?: Date
  updatedAt?: Date
}

interface LogLinenCreationAttributes
  extends Optional<LogLinenAttributes, 'id'> {}

interface LogLinenInstance
  extends Model<LogLinenAttributes, LogLinenCreationAttributes>,
    LogLinenAttributes {
  MasterCategory: MasterCategoryAttributes
}

const LogLinen = db.sequelize.define<LogLinenInstance>(tableName, {
  ...SequelizeAttributes.old.LogLinens,
})
LogLinen.associate = (models) => {
  LogLinen.belongsTo(models.MasterCategory)
}
export default LogLinen
