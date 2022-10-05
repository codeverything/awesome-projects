import SequeliceMigration from 'utils/SequeliceMigration'

const { Type } = require('helpers/migrationHelpers')

const tableName = 'HargaSpesifikasiKamars'
const columns = {
  harga: Type.uang(true, {
    defaultValue: 0,
  }),
  tanggalMulai: Type.tanggalBerlaku(true),
  tanggalSelesai: Type.tanggalBerlaku(true),
  SpesifikasiKamarId: Type.foreignKeyUUID(true),
}

module.exports = {
  ...SequeliceMigration.createTable(tableName, (DataTypes) => {
    return columns
  }),
}
