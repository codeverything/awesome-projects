// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'ReservasiKamarKamars'
export interface ReservasiKamarKamarsAttributes {
  id: string
  ReservasiKamarId?: string
  KamarId?: string
  diambilOleh?: string
  tanggalDiambil?: string
  MasterStatusLostAndFoundId?: string
  createdAt?: Date
  updatedAt?: Date
}

interface ReservasiKamarKamarsCreationAttributes
  extends Optional<ReservasiKamarKamarsAttributes, 'id'> {}

interface ReservasiKamarKamarInstance
  extends Model<
      ReservasiKamarKamarsAttributes,
      ReservasiKamarKamarsCreationAttributes
    >,
    ReservasiKamarKamarsAttributes {}

const ReservasikKamarKamar = db.sequelize.define<ReservasiKamarKamarInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.ReservasiKamarKamars,
  }
)
export default ReservasikKamarKamar
