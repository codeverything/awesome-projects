import SequeliceMigration from 'utils/SequeliceMigration'

const { Type } = require('helpers/migrationHelpers')

const tableName = 'LogHargaDefaultSpesifikasiKamars'
const columns = {
  SpesifikasiKamarId: Type.foreignKeyUUID(true),
  harga: Type.uang(true, {
    defaultValue: 0,
  }),
}

module.exports = {
  ...SequeliceMigration.createTable(tableName, (DataTypes) => {
    return columns
  }),
}
