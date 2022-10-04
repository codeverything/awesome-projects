import SequeliceMigration from 'utils/SequeliceMigration'

const { Type } = require('helpers/migrationHelpers')

const tableName = 'InvoiceTagihans'
const columns = {
  ReservasiKamarId: Type.foreignKeyUUID(),
  ReservasiFasilitasTambahanId: Type.foreignKeyUUID(),
  jumlah: Type.integer(true),
  ReservasiId: Type.foreignKeyUUID(true),
  deletedAt: Type.date(),
  HargaSpesifikasiKamarId: Type.foreignKeyUUID(),
  HargaFasilitasTambahanId: Type.foreignKeyUUID(),
  nilaiHarga: Type.uang(true),
  jumlahHarga: Type.uang(true),
}

module.exports = {
  ...SequeliceMigration.createTable(tableName, (DataTypes) => {
    return columns
  }),
}
