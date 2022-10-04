import SequeliceMigration from 'utils/SequeliceMigration'

const { Type } = require('helpers/migrationHelpers')

const tableName = 'Amenities'
const columns = {
  idItem: Type.string(true),
  nama: Type.string(true),
  jumlah: Type.integer(true, {
    defaultValue: 0,
  }),
}

module.exports = {
  ...SequeliceMigration.createTable(tableName, (DataTypes) => {
    return columns
  }),
}
