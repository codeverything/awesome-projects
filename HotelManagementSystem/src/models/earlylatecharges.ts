// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'EarlyLateCharges'

export interface EarlyLateChargeAttributes {
  id: string
  KamarId: string
  createdAt?: Date
  updatedAt?: Date
}

interface EarlyLateChargeCreationAttributes
  extends Optional<EarlyLateChargeAttributes, 'id'> {}

interface EarlyLateChargeInstance
  extends Model<EarlyLateChargeAttributes, EarlyLateChargeCreationAttributes>,
    EarlyLateChargeAttributes {}

const EarlyLateCharge = db.sequelize.define<EarlyLateChargeInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.EarlyLateCharges,
  }
)

EarlyLateCharge.associate = (models) => {
  EarlyLateCharge.hasOne(models.LogHargaEarlyLateCharge)
}

export default EarlyLateCharge
