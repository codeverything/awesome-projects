import SequeliceMigration from 'utils/SequeliceMigration'

const { Type } = require('helpers/migrationHelpers')

const tableName = 'ReservasiFasilitasTambahans'
const columns = {
  MasterFasilitasTambahanId: Type.foreignKeyUUID(true),
  jumlah: Type.integer(true),
  ReservasiKamarId: Type.foreignKeyUUID(true),
  ReservasiId: Type.foreignKeyUUID(true),
}

module.exports = {
  ...SequeliceMigration.createTable(tableName, (DataTypes) => {
    return columns
  }),
}
