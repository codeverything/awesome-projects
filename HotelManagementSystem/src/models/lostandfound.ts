// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'LostAndFounds'
export interface LostAndFoundAttributes {
  id?: string
  namaBarang?: string
  jumlah?: number
  KamarId?: string
  atasNama?: string
  tanggalCheckOut?: Date
  tanggalDitemukan?: Date | string
  noHandphone?: string
  lastUpdate?: string
  MasterStatusLostAndFoundId?: string
  ReservasiKamarId?: string
  InformasiOrangId?: string | any
  UserId?: string
  createdAt?: Date
  updatedAt?: Date
}

interface LostAndFoundCreationAttributes
  extends Optional<LostAndFoundAttributes, 'id'> {}

interface LostAndFoundInstance
  extends Model<LostAndFoundAttributes, LostAndFoundCreationAttributes>,
    LostAndFoundAttributes {}

const LostAndFound = db.sequelize.define<LostAndFoundInstance>(tableName, {
  ...SequelizeAttributes.old.LostAndFounds,
})

export default LostAndFound
