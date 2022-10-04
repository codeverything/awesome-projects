// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'LogHargaDefaultSpesifikasiKamars'

export interface LogHargaDefaultSpesifikasiKamarAttributes {
  id: string
  SpesifikasiKamarId: string
  harga: number
  createdAt?: Date
  updatedAt?: Date
}

interface LogHargaDefaultSpesifikasiKamarCreationAttributes
  extends Optional<LogHargaDefaultSpesifikasiKamarAttributes, 'id'> {}

interface LogHargaDefaultSpesifikasiKamarInstance
  extends Model<
      LogHargaDefaultSpesifikasiKamarAttributes,
      LogHargaDefaultSpesifikasiKamarCreationAttributes
    >,
    LogHargaDefaultSpesifikasiKamarAttributes {}

const LogHargaDefaultSpesifikasiKamar = db.sequelize.define<
  LogHargaDefaultSpesifikasiKamarInstance
>(tableName, {
  ...SequelizeAttributes.old.LogHargaDefaultSpesifikasiKamars,
})

export default LogHargaDefaultSpesifikasiKamar
