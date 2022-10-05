// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'ItemKamars'

export interface ItemKamarAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface ItemKamarCreationAttributes
  extends Optional<ItemKamarAttributes, 'id'> {}

interface ItemKamarInstance
  extends Model<ItemKamarAttributes, ItemKamarCreationAttributes>,
    ItemKamarAttributes {}

const ItemKamar = db.sequelize.define<ItemKamarInstance>(tableName, {
  ...SequelizeAttributes.old.ItemKamars,
})

ItemKamar.associate = (models) => {
  ItemKamar.hasOne(models.LogHargaItemKamar)
  ItemKamar.belongsToMany(models.SpesifikasiKamar, {
    through: models.SpesifikasiKamarItem,
  })
}

export default ItemKamar
