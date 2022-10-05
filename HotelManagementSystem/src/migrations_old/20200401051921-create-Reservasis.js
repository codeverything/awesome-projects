import SequeliceMigration from 'utils/SequeliceMigration'

const { Type } = require('helpers/migrationHelpers')

const tableName = 'Reservasis'
const columns = {
  MasterSourcePemesananId: Type.foreignKeyUUID(true),
  InformasiOrangId: Type.foreignKeyUUID(true),
  jumlahTamu: Type.integer(true),
  tanggalAwalCheckIn: Type.date(true),
  tanggalAkhirCheckOut: Type.date(true),
  tanggalReservasi: Type.date(true),
  nomorInvoice: Type.string(true),
  MasterJenisJaminanId: Type.foreignKeyUUID(true),
  MasterJenisPembayaranId: Type.foreignKeyUUID(),
  nomorIdentitas: Type.string(),
  nilaiDeposit: Type.uang(),
  discountAmount: Type.uang(),
  MasterTipePromoId: Type.foreignKeyUUID(),
  nilaiPromo: Type.uang(),
  MasterStatusPemesananId: Type.foreignKeyUUID(true),
  MasterStatusPembayaranId: Type.foreignKeyUUID(true),
  kodeBooking: Type.string(),
  MasterOTAId: Type.foreignKeyUUID(),
}

module.exports = {
  ...SequeliceMigration.createTable(tableName, (DataTypes) => {
    return columns
  }),
}
