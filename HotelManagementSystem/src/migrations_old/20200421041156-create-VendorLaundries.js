import SequeliceMigration from 'utils/SequeliceMigration'

const { Type } = require('helpers/migrationHelpers')

const tableName = 'VendorLaundries'
const columns = {
  idVendor: Type.string(true),
  nama: Type.string(true),
  alamat: Type.string(true),
  kontak: Type.string(true),
  MasterJenisVendorLaundryId: Type.foreignKeyUUID(true),
}

module.exports = {
  ...SequeliceMigration.createTable(tableName, (DataTypes) => {
    return columns
  }),
}
