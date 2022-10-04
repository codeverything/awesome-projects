// eslint-disable-next-line no-unused-vars
import { Model, Optional, DataTypes } from 'sequelize'
import { ConstMasterStatusTagihan } from 'constants/index'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { LinenAttributes } from './linen'
import { ItemKamarAttributes } from './itemkamar'
import { MasterTagihanKerusakanKehilanganAttributes } from './mastertagihankerusakankehilangan'
import { MasterTipeBarangAttributes } from './mastertipebarang'

import db from './_instance'

const tableName = 'ReservasiKamarItemKamars'
export interface ReservasiKamarItemKamarAttributes {
  id: string
  ReservasiKamarId: string
  ItemKamarId: string
  LinenId: string
  KamarId: string
  jumlah: number
  nama: string
  MasterStatusTagihanId: string
  MasterTagihanKerusakanKehilanganId: string
  MasterTipeBarangId: string
  Linen: LinenAttributes
  ItemKamar: ItemKamarAttributes
  MasterTagihanKerusakanKehilangan: MasterTagihanKerusakanKehilanganAttributes
  MasterTipeBarang: MasterTipeBarangAttributes
  createdAt?: Date
  updatedAt?: Date
}

interface ReservasiKamarItemKamarCreationAttributes
  extends Optional<ReservasiKamarItemKamarAttributes, 'id'> {}

interface ReservasiKamarItemKamarInstance
  extends Model<
      ReservasiKamarItemKamarAttributes,
      ReservasiKamarItemKamarCreationAttributes
    >,
    ReservasiKamarItemKamarAttributes {}

const ReservasiKamarItemKamar = db.sequelize.define<
  ReservasiKamarItemKamarInstance
>(tableName, {
  ...SequelizeAttributes.old.ReservasiKamarItemKamars,
  MasterStatusTagihanId: {
    type: DataTypes.UUID,
    defaultValue: ConstMasterStatusTagihan.TIDAK_TAGIHKAN,
  },
})

ReservasiKamarItemKamar.associate = (model) => {
  ReservasiKamarItemKamar.belongsTo(model.MasterStatusTagihan)
  ReservasiKamarItemKamar.belongsTo(model.MasterTagihanKerusakanKehilangan)
  ReservasiKamarItemKamar.belongsTo(model.Linen)
  ReservasiKamarItemKamar.belongsTo(model.ItemKamar)
  ReservasiKamarItemKamar.belongsTo(model.MasterTipeBarang)
}

export default ReservasiKamarItemKamar
