// eslint-disable-next-line no-unused-vars
import { DataTypes, Model, Optional } from 'sequelize'
import { InformasiOrangAttributes } from 'models/informasiorang'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { MasterOTAAttributes } from './masterota'
import { MasterStatusPemesananAttributes } from './masterstatuspemesanan'
import { MasterSourcePemesananAttributes } from './mastersourcepemesanan'
import { MasterStatusPembayaranAttributes } from './masterstatuspembayaran'
import { PerusahaanAttributes } from './perusahaan'
import { MasterTipeTamuAttributes } from './mastertipetamu'

import db from './_instance'

const tableName = 'Reservasis'
export interface ReservasiAttributes {
  id: string
  MasterSourcePemesananId: string
  InformasiOrangId: Date
  jumlahTamu: number
  tanggalAwalCheckIn: Date
  tanggalAkhirCheckOut: Date
  tanggalReservasi: Date
  nomorInvoice: string
  MasterJenisJaminanId: string
  MasterJenisPembayaranId: string
  nomorIdentitas: string
  nilaiDeposit: number
  discountAmount: number
  MasterTipePromoId: string
  nilaiPromo: number
  MasterStatusPemesananId: string
  MasterStatusPembayaranId: string
  MasterTipeIdentitasId: string
  kodeBooking: string
  MasterStatusPemesanan: MasterStatusPemesananAttributes
  MasterSourcePemesanan: MasterSourcePemesananAttributes
  MasterStatusPembayaran: MasterStatusPembayaranAttributes
  Perusahaan: PerusahaanAttributes
  InformasiOrang: InformasiOrangAttributes
  dataValues: any
  MasterOTAId: string
  PerusahaanId: string
  PromoId: string
  totalPembayaran: number
  totalTagihan: number
  balance: number
  totalRefund: number
  listKamar: any[]
  isSelesai: boolean
  downPayment: number
  path: string
  MasterTipeTamuId: string
  MasterTipeTamu: MasterTipeTamuAttributes
  createdAt?: Date
  updatedAt?: Date
}

interface ReservasiCreationAttributes
  extends Optional<ReservasiAttributes, 'id'> {}

export interface ReservasiInstance
  extends Model<ReservasiAttributes, ReservasiCreationAttributes>,
    ReservasiAttributes {
  ReservasiKamars: any
  listKamar: any[]
  MasterStatusPemesanan: MasterStatusPemesananAttributes
  MasterSourcePemesanan: MasterSourcePemesananAttributes
  MasterStatusPembayaran: MasterStatusPembayaranAttributes
  Perusahaan: PerusahaanAttributes
  InformasiOrang: InformasiOrangAttributes
  dataValues: any
  MasterOTA: MasterOTAAttributes
}

const Reservasi = db.sequelize.define<ReservasiInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.Reservasis,
    isSelesai: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { freezeTableName: true }
)

Reservasi.associate = (models) => {
  Reservasi.belongsTo(models.InformasiOrang)
  Reservasi.belongsTo(models.Promo)
  Reservasi.belongsTo(models.Perusahaan)
  Reservasi.belongsTo(models.MasterJenisJaminan)
  Reservasi.belongsTo(models.MasterJenisPembayaran)
  Reservasi.belongsTo(models.MasterTipePromo)
  Reservasi.belongsTo(models.MasterStatusPembayaran)
  Reservasi.belongsTo(models.MasterStatusPemesanan)
  Reservasi.belongsTo(models.MasterSourcePemesanan)
  Reservasi.belongsTo(models.MasterOTA)
  Reservasi.belongsTo(models.MasterTipeTamu)
  Reservasi.belongsTo(models.MasterTipeIdentitas, {
    foreignKey: 'MasterTipeIdentitasId',
  })
  Reservasi.hasMany(models.ReservasiKamar, { foreignKey: 'ReservasiId' })
  Reservasi.hasMany(models.ReservasiFasilitasTambahan, {
    foreignKey: 'ReservasiId',
  })
  Reservasi.hasMany(models.InvoiceRefund, {
    foreignKey: 'ReservasiId',
  })
  Reservasi.hasMany(models.InvoicePembayaran, {
    foreignKey: 'ReservasiId',
  })
  Reservasi.hasMany(models.InvoiceTambahan, {
    foreignKey: 'ReservasiId',
  })
  Reservasi.hasMany(models.InvoiceTagihan, {
    foreignKey: 'ReservasiId',
  })
}

export default Reservasi
