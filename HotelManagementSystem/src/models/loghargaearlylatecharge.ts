// eslint-disable-next-line no-unused-vars
import models from 'models'
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'LogHargaEarlyLateCharges'

export interface LogHargaEarlyLateChargeAttributes {
  id: string
  EarlyLateChargeId: string
  harga: number
  mulaiLateCheckOut: Date
  mulaiLateCheckOutFullDay: Date
  batasAkhirCheckIn: Date
  batasAkhirCheckInFullDay: Date
  createdAt?: Date
  updatedAt?: Date
}

interface LogHargaEarlyLateChargeCreationAttributes
  extends Optional<LogHargaEarlyLateChargeAttributes, 'id'> {}

interface LogHargaEarlyLateChargeInstance
  extends Model<
      LogHargaEarlyLateChargeAttributes,
      LogHargaEarlyLateChargeCreationAttributes
    >,
    LogHargaEarlyLateChargeAttributes {}

const LogHargaEarlyLateCharge = db.sequelize.define<
  LogHargaEarlyLateChargeInstance
>(tableName, {
  ...SequelizeAttributes.old.LogHargaEarlyLateCharges,
})

LogHargaEarlyLateCharge.associate = (models) => {
  LogHargaEarlyLateCharge.belongsTo(models.EarlyLateCharge)
}

export default LogHargaEarlyLateCharge
