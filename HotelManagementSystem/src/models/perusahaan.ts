// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'Perusahaans'
export interface PerusahaanAttributes {
  id: string
  nama: string
  alamat: string
  nomorHandphone: string
  email: string
  InformasiOrangId: string
  deletedAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

interface PerusahaanCreationAttributes
  extends Optional<PerusahaanAttributes, 'id'> {}

interface PerusahaanInstance
  extends Model<PerusahaanAttributes, PerusahaanCreationAttributes>,
    PerusahaanAttributes {}

const Perusahaan = db.sequelize.define<PerusahaanInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.Perusahaans,
  },
  {
    paranoid: true,
  }
)

Perusahaan.associate = (models) => {
  Perusahaan.belongsTo(models.InformasiOrang)
}
export default Perusahaan
