// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { KamarAttributes } from './kamar'

import db from './_instance'

const tableName = 'LogLostAndFounds'

export interface LogLostAndFoundAttributes {
  id?: string | undefined
  namaBarang?: string | undefined
  jumlah?: number | undefined
  KamarId?: string | undefined
  atasNama?: string | undefined
  tanggalCheckOut?: Date | undefined
  tanggalDitemukan?: Date | undefined | string
  noHandphone?: string | undefined
  lastUpdate?: string | undefined
  MasterStatusLostAndFoundId?: string | undefined
  ReservasiKamarId?: string | undefined
  InformasiOrangId?: string | any
  createdAt?: Date | undefined
  updatedAt?: Date | undefined
}

interface LogLostAndFoundCreationAttributes
  extends Optional<LogLostAndFoundAttributes, 'id'> {}

interface LogLostAndFoundInstance
  extends Model<LogLostAndFoundAttributes, LogLostAndFoundCreationAttributes>,
    LogLostAndFoundAttributes {
  Kamar: KamarAttributes
}

const LogLostAndFound = db.sequelize.define<LogLostAndFoundInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.LogLostAndFounds,
  }
)
LogLostAndFound.associate = (models) => {
  LogLostAndFound.belongsTo(models.Kamar)
}
export default LogLostAndFound
