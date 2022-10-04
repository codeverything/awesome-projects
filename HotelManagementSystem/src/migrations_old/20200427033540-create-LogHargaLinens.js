import SequeliceMigration from 'utils/SequeliceMigration'

const { Type } = require('helpers/migrationHelpers')

const tableName = 'LogHargaLinens'
const columns = {
  LinenId: Type.foreignKeyUUID(true),
  harga: Type.uang(true),
}

module.exports = {
  ...SequeliceMigration.createTable(tableName, (DataTypes) => {
    return columns
  }),
}
