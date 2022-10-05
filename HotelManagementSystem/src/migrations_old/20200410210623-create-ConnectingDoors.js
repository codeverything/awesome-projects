import SequeliceMigration from 'utils/SequeliceMigration'

const { Type } = require('helpers/migrationHelpers')

const tableName = 'ConnectingDoors'
const columns = {
  KamarId: Type.foreignKeyUUID(true),
}

module.exports = {
  ...SequeliceMigration.createTable(tableName, (DataTypes) => {
    return columns
  }),
}
