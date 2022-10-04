// eslint-disable-next-line no-unused-vars
import models from 'models'
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterTipePromos'
export interface MasterTipePromoAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterTipePromoCreationAttributes
  extends Optional<MasterTipePromoAttributes, 'id'> {}

interface MasterTipePromoInstance
  extends Model<MasterTipePromoAttributes, MasterTipePromoCreationAttributes>,
    MasterTipePromoAttributes {}

const MasterTipePromo = db.sequelize.define<MasterTipePromoInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterTipePromos,
  }
)
MasterTipePromo.associate = (models) => {
  MasterTipePromo.hasOne(models.Promo)
}
export default MasterTipePromo
