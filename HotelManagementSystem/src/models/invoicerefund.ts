// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'InvoiceRefunds'

export interface InvoiceRefundAttributes {
  id: string
  MasterItemPembayaranId?: string | undefined
  MasterTipePembayaranId?: string | undefined
  nilai?: number | undefined
  keterangan?: string | undefined
  ReservasiId?: string | undefined
  deletedAt?: Date | undefined
  createdAt?: Date | undefined
  updatedAt?: Date | undefined
}

interface InvoiceRefundCreationAttributes
  extends Optional<InvoiceRefundAttributes, 'id'> {}

interface InvoiceRefundInstance
  extends Model<InvoiceRefundAttributes, InvoiceRefundCreationAttributes>,
    InvoiceRefundAttributes {}

const InvoiceRefund = db.sequelize.define<InvoiceRefundInstance>(tableName, {
  ...SequelizeAttributes.old.InvoiceRefunds,
})
InvoiceRefund.associate = (models) => {
  // associations can be defined here
  InvoiceRefund.belongsTo(models.MasterItemPembayaran)
  InvoiceRefund.belongsTo(models.MasterTipePembayaran)
}

export default InvoiceRefund
