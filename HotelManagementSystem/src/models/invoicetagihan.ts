// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'InvoiceTagihans'
export interface InvoiceTagihanAttributes {
  id: string
  ReservasiKamarId?: string
  ReservasiFasilitasTambahanId?: string
  jumlah?: number | undefined | any
  ReservasiId?: string
  deletedAt?: Date
  HargaSpesifikasiKamarId?: string
  nilaiHarga?: number | undefined | any
  jumlahHarga?: number
  namaSpesifikasiKamar?: string
  LogHargaDefaultSpesifikasiKamarId?: string
  LogHargaMasterFasilitasTambahanId?: string
  keteranganFasilitasTambahan?: string
  promoNilai?: number
  satuan?: string
  tanggalMenginap?: string
  createdAt?: Date | any
  updatedAt?: Date
}

interface InvoiceTagihanCreationAttributes
  extends Optional<InvoiceTagihanAttributes, 'id'> {}

interface InvoiceTagihanInstance
  extends Model<InvoiceTagihanAttributes, InvoiceTagihanCreationAttributes>,
    InvoiceTagihanAttributes {}

const InvoiceTagihan = db.sequelize.define<InvoiceTagihanInstance>(tableName, {
  ...SequelizeAttributes.old.InvoiceTagihans,
})

InvoiceTagihan.associate = (model) => {
  InvoiceTagihan.belongsTo(model.ReservasiKamar)
  InvoiceTagihan.belongsTo(model.ReservasiFasilitasTambahan)
}

export default InvoiceTagihan
