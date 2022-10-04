import SequeliceMigration from 'utils/SequeliceMigration'

const { Type } = require('helpers/migrationHelpers')

const tableName = 'InvoicePembayarans'
const columns = {
  MasterItemPembayaranId: Type.foreignKeyUUID(true),
  MasterTipePembayaranId: Type.foreignKeyUUID(true),
  nilai: Type.uang(true),
  keterangan: Type.string(),
  ReservasiId: Type.foreignKeyUUID(true),
  deletedAt: Type.date(),
}

module.exports = {
  ...SequeliceMigration.createTable(tableName, (DataTypes) => {
    return columns
  }),
}
