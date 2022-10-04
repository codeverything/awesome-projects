// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'ItemRuangans'

export interface ItemRuanganAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface ItemRuanganCreationAttributes
  extends Optional<ItemRuanganAttributes, 'id'> {}

interface ItemRuanganInstance
  extends Model<ItemRuanganAttributes, ItemRuanganCreationAttributes>,
    ItemRuanganAttributes {}

const ItemRuangan = db.sequelize.define<ItemRuanganInstance>(tableName, {
  ...SequelizeAttributes.old.ItemRuangans,
})

export default ItemRuangan
