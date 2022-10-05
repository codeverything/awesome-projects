// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'LogHargaTipeRuangans'
export interface LogHargaTipeRuanganAttributes {
  id: string
  harga: number
  tanggalBerlaku: Date
  RuanganId: string
  createdAt?: Date
  updatedAt?: Date
}

interface LogHargaTipeRuanganCreationAttributes
  extends Optional<LogHargaTipeRuanganAttributes, 'id'> {}

interface LogHargaTipeRuanganInstance
  extends Model<
      LogHargaTipeRuanganAttributes,
      LogHargaTipeRuanganCreationAttributes
    >,
    LogHargaTipeRuanganAttributes {}

const LogHargaTipeRuangan = db.sequelize.define<LogHargaTipeRuanganInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.LogHargaTipeRuangans,
  }
)

export default LogHargaTipeRuangan
