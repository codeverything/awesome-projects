// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { LinenAttributes } from './linen'
import { KamarAttributes } from './kamar'

import db from './_instance'

const tableName = 'LogLinenSupplyChains'

export interface LogLinenSupplyChainAttributes {
  id?: string
  namaStaff: string | any
  masukBersih?: number | any
  keluarKotor?: number | any
  hilangAwal?: number | any
  rusakAwal?: number | any
  hilangAkhir?: number | any
  rusakAkhir?: number | any
  KamarId?: string | any
  LinenId?: string
  ReservasiKamarId?: string | undefined
  LinenSupplyChainId?: string | any
  Linen: LinenAttributes | any
  Kamar?: KamarAttributes
  createdAt?: Date
  updatedAt?: Date
}

interface LogLinenSupplyChainCreationAttributes
  extends Optional<LogLinenSupplyChainAttributes, 'id'> {
  Linen: any
  Kamar?: KamarAttributes
}

interface LogLinenSupplyChainInstance
  extends Model<
      LogLinenSupplyChainAttributes,
      LogLinenSupplyChainCreationAttributes
    >,
    LogLinenSupplyChainAttributes {}

const LogLinenSupplyChain = db.sequelize.define<LogLinenSupplyChainInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.LogLinenSupplyChains,
  }
)
LogLinenSupplyChain.associate = (models) => {
  LogLinenSupplyChain.belongsTo(models.Linen)
  LogLinenSupplyChain.belongsTo(models.Kamar)
}
export default LogLinenSupplyChain
