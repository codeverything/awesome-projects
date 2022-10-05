// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { SpesifikasiKamarAttributes } from './spesifikasikamar'

import db from './_instance'

const tableName = 'HargaSpesifikasiKamars'

export interface HargaSpesifikasiKamarAttributes {
  id: string
  harga?: number | any
  tanggalMulai?: Date | any
  tanggalSelesai?: Date | any
  SpesifikasiKamarId: string
  SpesifikasiKamar?: SpesifikasiKamarAttributes
  createdAt?: Date
  updatedAt?: Date
}

interface HargaSpesifikasiKamarCreationAttributes
  extends Optional<HargaSpesifikasiKamarAttributes, 'id'> {}

interface HargaSpesifikasiKamarInstance
  extends Model<
      HargaSpesifikasiKamarAttributes,
      HargaSpesifikasiKamarCreationAttributes
    >,
    HargaSpesifikasiKamarAttributes {}

const HargaSpesifikasiKamar = db.sequelize.define<
  HargaSpesifikasiKamarInstance
>(tableName, {
  ...SequelizeAttributes.old.HargaSpesifikasiKamars,
})

HargaSpesifikasiKamar.associate = (models) => {
  HargaSpesifikasiKamar.belongsTo(models.SpesifikasiKamar)
}

export default HargaSpesifikasiKamar
