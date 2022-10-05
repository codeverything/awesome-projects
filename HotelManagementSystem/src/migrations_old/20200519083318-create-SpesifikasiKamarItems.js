import SequeliceMigration from 'utils/SequeliceMigration'

const { Type } = require('helpers/migrationHelpers')

const tableName = 'SpesifikasiKamarItems'
const columns = {
  ItemKamarId: Type.foreignKeyUUID(true),
  SpesifikasiKamarId: Type.foreignKeyUUID(true),
}

module.exports = {
  ...SequeliceMigration.createTable(tableName, (DataTypes) => {
    return columns
  }),
}
