// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { KamarAttributes } from './kamar'

import db from './_instance'

const tableName = 'LinenSupplyChains'

export interface LinenSupplyChainAttributes {
  id?: string
  masukBersih?: number | any
  keluarKotor?: number | any
  hilangAwal?: number | any
  rusakAwal?: number | any
  hilangAkhir?: number | any
  rusakAkhir?: number | any
  KamarId?: string | any
  ReservasiKamarId?: string | undefined
  LinenId?: string
  createdAt?: Date
  updatedAt?: Date
}

interface LinenSupplyChainCreationAttributes
  extends Optional<LinenSupplyChainAttributes, 'id'> {}

interface LinenSupplyChainInstance
  extends Model<LinenSupplyChainAttributes, LinenSupplyChainCreationAttributes>,
    LinenSupplyChainAttributes {
  Kamar: KamarAttributes
}

const LinenSupplyChain = db.sequelize.define<LinenSupplyChainInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.LinenSupplyChains,
  }
)
LinenSupplyChain.associate = (models) => {
  LinenSupplyChain.belongsTo(models.Linen)
  LinenSupplyChain.belongsTo(models.Kamar)
}
export default LinenSupplyChain
