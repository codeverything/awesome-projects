// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { MasterCategoryAttributes } from './mastercategory'

import db from './_instance'

const tableName = 'LogAmenitities'

export interface LogAmenityAttributes {
  id?: string
  namaStaff?: string | undefined
  KamarId?: string | undefined
  AmenityId?: string | undefined
  AmenitySupplyId?: string | undefined
  jumlah?: number | any
  ReservasiKamarId?: string | undefined
  keterangan?: string | undefined
  MasterCategoryId: string
  log?: string | undefined
  createdAt?: Date
  updatedAt?: Date
}

interface LogAmenityCreationAttributes
  extends Optional<LogAmenityAttributes, 'id'> {}

interface LogAmenityInstance
  extends Model<LogAmenityAttributes, LogAmenityCreationAttributes>,
    LogAmenityAttributes {
  MasterCategory: MasterCategoryAttributes
}

const LogAmenity = db.sequelize.define<LogAmenityInstance>(tableName, {
  ...SequelizeAttributes.old.LogAmenitities,
})

LogAmenity.associate = (models) => {
  LogAmenity.belongsTo(models.MasterCategory)
}
export default LogAmenity
