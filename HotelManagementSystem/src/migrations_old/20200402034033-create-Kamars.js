import SequeliceMigration from 'utils/SequeliceMigration'

const { Type } = require('helpers/migrationHelpers')
const { DataTypes } = require('sequelize')
const ConstMasterStatusHK = require('constants/ConstMasterStatusHK')
const ConstMasterStatusKamar = require('constants/ConstMasterStatusKamar')

const tableName = 'Kamars'
const columns = {
  nomor: Type.string(true, {
    type: DataTypes.STRING(191),
    unique: true,
  }),
  SpesifikasiKamarId: Type.foreignKeyUUID(true),
  MasterStatusHKId: Type.foreignKeyUUID(true, {
    defaultValue: ConstMasterStatusHK.AVAILABLE_CLEAN,
  }),
  MasterStatusKamarId: Type.foreignKeyUUID(true, {
    defaultValue: ConstMasterStatusKamar.CHECKED_OUT,
  }),
  keterangan: Type.string(),
}

module.exports = {
  ...SequeliceMigration.createTable(tableName, (DataTypes) => {
    return columns
  }),
}
