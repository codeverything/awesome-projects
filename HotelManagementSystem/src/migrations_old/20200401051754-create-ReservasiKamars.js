import SequeliceMigration from 'utils/SequeliceMigration'

const { Type } = require('helpers/migrationHelpers')

const tableName = 'ReservasiKamars'
const columns = {
  KamarId: Type.foreignKeyUUID(),
  tanggalCheckIn: Type.tanggalCheckInCheckOut(true),
  tanggalCheckOut: Type.tanggalCheckInCheckOut(true),
  MasterTipePromoId: Type.foreignKeyUUID(),
  nilaiPromo: Type.uang(),
  MasterTipeKamarId: Type.foreignKeyUUID(true),
  MasterTipeKasurId: Type.foreignKeyUUID(true),
  MasterSpecialRequirementId: Type.foreignKeyUUID(true),
  SpesifikasiKamarId: Type.foreignKeyUUID(true),
  keterangan: Type.text(),
  ReservasiId: Type.foreignKeyUUID(true),
  hargaOTA: Type.uang(),
}

module.exports = {
  ...SequeliceMigration.createTable(tableName, (DataTypes) => {
    return columns
  }),
}
