// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'LogExtendKamars'

export interface LogExtendKamarAttributes {
  id?: string
  tanggalAwalCheckOutAndTanggalAkhirCheckOut: Date | string
  ReservasiKamarId?: string | undefined
  createdAt?: Date
  updatedAt?: Date
}

interface LogExtendKamarCreationAttributes
  extends Optional<LogExtendKamarAttributes, 'id'> {
  tanggalAwalCheckOutAndTanggalAkhirCheckOut: Date | string
  ReservasiKamarId: string
}

interface LogExtendKamarInstance
  extends Model<LogExtendKamarAttributes, LogExtendKamarCreationAttributes>,
    LogExtendKamarAttributes {}

const LogExtendKamar = db.sequelize.define<LogExtendKamarInstance>(tableName, {
  ...SequelizeAttributes.old.LogExtendKamars,
})
LogExtendKamar.associate = (models) => {
  LogExtendKamar.belongsTo(models.ReservasiKamar)
}
export default LogExtendKamar
