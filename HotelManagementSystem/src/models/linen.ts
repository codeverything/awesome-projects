// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'Linens'

export interface LinenAttributes {
  id: string
  idItem: string
  nama: string
  jumlah: number | any
  createdAt?: Date
  updatedAt?: Date
}

interface LinenCreationAttributes extends Optional<LinenAttributes, 'id'> {}

interface LinenInstance
  extends Model<LinenAttributes, LinenCreationAttributes>,
    LinenAttributes {}

const Linen = db.sequelize.define<LinenInstance>(tableName, {
  ...SequelizeAttributes.old.Linens,
})

Linen.associate = (models) => {
  Linen.hasOne(models.LogHargaLinen)
  Linen.belongsToMany(models.SpesifikasiKamar, {
    through: models.SpesifikasiKamarLinen,
  })
}

export default Linen
