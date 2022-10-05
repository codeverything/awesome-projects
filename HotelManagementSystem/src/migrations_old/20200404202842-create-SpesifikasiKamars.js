import SequeliceMigration from 'utils/SequeliceMigration'

const { Type } = require('helpers/migrationHelpers')

const tableName = 'SpesifikasiKamars'
const columns = {
  nama: Type.string(true),
  MasterTipeKamarId: Type.foreignKeyUUID(true),
  MasterTipeKasurId: Type.foreignKeyUUID(true),
  MasterSpecialRequirementId: Type.foreignKeyUUID(true),
  maxTamu: Type.integer(true, {
    defaultValue: 0,
  }),
}

module.exports = {
  ...SequeliceMigration.createTable(tableName, (DataTypes) => {
    return columns
  }),
}
