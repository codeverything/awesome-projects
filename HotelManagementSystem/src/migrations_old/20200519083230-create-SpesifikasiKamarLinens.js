import SequeliceMigration from 'utils/SequeliceMigration'

const { Type } = require('helpers/migrationHelpers')

const tableName = 'SpesifikasiKamarLinens'
const columns = {
  LinenId: Type.foreignKeyUUID(true),
  SpesifikasiKamarId: Type.foreignKeyUUID(true),
}

module.exports = {
  ...SequeliceMigration.createTable(tableName, (DataTypes) => {
    return columns
  }),
}
