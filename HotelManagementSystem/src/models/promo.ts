// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import { toUpper } from 'lodash'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { MasterTipePromoAttributes } from './mastertipepromo'

import db from './_instance'

const tableName = 'Promos'
export interface PromoAttributes {
  id: string
  nama: string
  kuota: number
  tanggalMulai: Date
  tanggalSelesai: Date
  nilai: number
  MasterTipePromoId: string
  MasterTipePromo: MasterTipePromoAttributes
  kode: string
  sisaKuota: number
  createdAt?: Date
  updatedAt?: Date
}

interface PromoCreationAttributes extends Optional<PromoAttributes, 'id'> {}

interface PromoInstance
  extends Model<PromoAttributes, PromoCreationAttributes>,
    PromoAttributes {}

const Promo = db.sequelize.define<PromoInstance>(tableName, {
  ...SequelizeAttributes.old.Promos,
})

Promo.addHook('beforeCreate', (instance: PromoAttributes | any) => {
  instance.kode = toUpper(instance.kode)
  instance.nama = toUpper(instance.nama)
})
Promo.associate = (models) => {
  Promo.belongsTo(models.MasterTipePromo, { foreignKey: 'MasterTipePromoId' })
}
export default Promo
