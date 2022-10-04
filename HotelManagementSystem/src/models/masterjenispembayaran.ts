// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterJenisPembayarans'
export interface MasterJenisPembayaranAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterJenisPembayaranCreationAttributes
  extends Optional<MasterJenisPembayaranAttributes, 'id'> {}

interface MasterJenisPembayaranInstance
  extends Model<
      MasterJenisPembayaranAttributes,
      MasterJenisPembayaranCreationAttributes
    >,
    MasterJenisPembayaranAttributes {}

const MasterJenisPembayaran = db.sequelize.define<
  MasterJenisPembayaranInstance
>(tableName, {
  ...SequelizeAttributes.old.MasterJenisPembayarans,
})

export default MasterJenisPembayaran
