// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'InvoicePembayarans'

export interface InvoicePembayaranAttributes {
  id?: string
  MasterItemPembayaranId?: string
  MasterTipePembayaranId?: string
  nilai?: number
  keterangan?: string
  ReservasiId?: string
  deletedAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

interface InvoicePembayaranCreationAttributes
  extends Optional<InvoicePembayaranAttributes, 'id'> {}

interface InvoicePembayaranInstance
  extends Model<
      InvoicePembayaranAttributes,
      InvoicePembayaranCreationAttributes
    >,
    InvoicePembayaranAttributes {}

const InvoicePembayaran = db.sequelize.define<InvoicePembayaranInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.InvoicePembayarans,
  }
)

InvoicePembayaran.associate = function (models) {
  // associations can be defined here
  InvoicePembayaran.belongsTo(models.MasterItemPembayaran)
  InvoicePembayaran.belongsTo(models.MasterTipePembayaran)
}

export default InvoicePembayaran
