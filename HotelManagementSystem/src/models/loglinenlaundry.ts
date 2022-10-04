// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { VendorLaundryAttributes } from './vendorLaundry'
import { LinenAttributes } from './linen'

import db from './_instance'

const tableName = 'LogLinenLaundries'

export interface LogLinenLaundryAttributes {
  id: string
  VendorLaundryId: string
  LinenId: string
  masukBersih: number
  keluarKotor: number
  KamarId: string
  namaStaff: string
  nama: string
  UserId: string
  createdAt?: Date | any
  updatedAt?: Date
}

interface LogLinenLaundryCreationAttributes
  extends Optional<LogLinenLaundryAttributes, 'id'> {}

export interface LogLinenLaundryInstance
  extends Model<LogLinenLaundryAttributes, LogLinenLaundryCreationAttributes>,
    LogLinenLaundryAttributes {
  VendorLaundry: VendorLaundryAttributes
  Linen: LinenAttributes
}

const LogLinenLaundry = db.sequelize.define<LogLinenLaundryInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.LogLinenLaundries,
  }
)

LogLinenLaundry.associate = (model) => {
  LogLinenLaundry.belongsTo(model.VendorLaundry)
  LogLinenLaundry.belongsTo(model.Linen)
}
export default LogLinenLaundry
