import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

export interface ReservasiKamarInvoiceTagihanAttributes {
  id?: string
  ReservasiKamarId: string
  InvoiceTagihanId: string
  nominal: number
  createdAt?: Date
  updatedAt?: Date
}

interface ReservasiKamarCreationAttributes
  extends Optional<ReservasiKamarInvoiceTagihanAttributes, 'id'> {}

interface ReservasiKamarInvoiceTagihanInstance
  extends Model<
      ReservasiKamarInvoiceTagihanAttributes,
      ReservasiKamarCreationAttributes
    >,
    ReservasiKamarInvoiceTagihanAttributes {}

const ReservasiKamarInvoiceTagihan = db.sequelize.define<
  ReservasiKamarInvoiceTagihanInstance
>('ReservasiKamarInvoiceTagihans', {
  ...SequelizeAttributes.old.ReservasiKamarInvoiceTagihans,
})
export default ReservasiKamarInvoiceTagihan
