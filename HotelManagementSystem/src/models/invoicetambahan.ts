// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { ReservasiKamarAttributes } from './reservasikamar'
import { MasterItemTagihanAttributes } from './masteritemtagihan'
import { MasterFasilitasTambahanAttributes } from './masterfasilitastambahan'

import db from './_instance'

const tableName = 'InvoiceTambahans'

export interface InvoiceTambahanAttributes {
  id: string
  MasterItemTagihanId?: string
  ReservasiFasilitasTambahanId?: string
  ReservasiExtendKamarId?: string
  jumlah?: number
  ReservasiId?: string
  deletedAt?: Date
  HargaMasterItemTagihanId?: string
  HargaSpesifikasiKamarId?: string
  MasterTipePromoId?: string
  nilaiHarga?: number
  nilaiDiskon?: number
  jumlahHarga?: number
  LogHargaDefaultSpesifikasiKamarId?: string
  LogHargaMasterFasilitasTambahanId?: string
  MasterSatuanId?: string
  MasterFasilitasTambahanId?: string
  tanggalExtend?: string
  keterangan?: string
  keteranganSwap?: string
  createdAt?: Date | any
  updatedAt?: Date
}

interface InvoiceTambahanCreationAttributes
  extends Optional<InvoiceTambahanAttributes, 'id'> {}

interface InvoiceTambahanInstance
  extends Model<InvoiceTambahanAttributes, InvoiceTambahanCreationAttributes>,
    InvoiceTambahanAttributes {
  ReservasiKamar: ReservasiKamarAttributes
  MasterItemTagihan: MasterItemTagihanAttributes
  MasterFasilitasTambahan: MasterFasilitasTambahanAttributes
  keteranganFasilitasTambahan: string
}

const InvoiceTambahan = db.sequelize.define<InvoiceTambahanInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.InvoiceTambahans,
  }
)

InvoiceTambahan.associate = (models) => {
  InvoiceTambahan.belongsTo(models.ReservasiKamar, {
    foreignKey: 'ReservasiExtendKamarId',
  })
  InvoiceTambahan.belongsTo(models.ReservasiFasilitasTambahan)
  InvoiceTambahan.belongsTo(models.MasterItemTagihan)
  InvoiceTambahan.belongsTo(models.HargaSpesifikasiKamar)
  InvoiceTambahan.belongsTo(models.LogHargaMasterFasilitasTambahan)
  InvoiceTambahan.belongsTo(models.MasterFasilitasTambahan)
  InvoiceTambahan.belongsTo(models.MasterSatuan)
}
export default InvoiceTambahan
