// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'LogNilaiPromos'
export interface LogNilaiPromoAttributes {
  id: string
  nilai: number
  waktuSelesai: Date
  PromoId: string
  createdAt?: Date
  updatedAt?: Date
}

interface LogNilaiPromoCreationAttributes
  extends Optional<LogNilaiPromoAttributes, 'id'> {}

interface LogNilaiPromoInstance
  extends Model<LogNilaiPromoAttributes, LogNilaiPromoCreationAttributes>,
    LogNilaiPromoAttributes {}

const LogNilaiPromo = db.sequelize.define<LogNilaiPromoInstance>(tableName, {
  ...SequelizeAttributes.old.LogNilaiPromos,
})

export default LogNilaiPromo
