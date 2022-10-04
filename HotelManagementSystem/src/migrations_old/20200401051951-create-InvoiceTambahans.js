import SequeliceMigration from 'utils/SequeliceMigration'

const { Type } = require('helpers/migrationHelpers')

const tableName = 'InvoiceTambahans'
const columns = {
  MasterItemTagihanId: Type.foreignKeyUUID(),
  ReservasiFasilitasTambahanId: Type.foreignKeyUUID(),
  ReservasiExtendKamarId: Type.foreignKeyUUID(),
  jumlah: Type.integer(true),
  ReservasiId: Type.foreignKeyUUID(true),
  deletedAt: Type.date(),
  HargaMasterItemTagihanId: Type.foreignKeyUUID(),
  HargaSpesifikasiKamarId: Type.foreignKeyUUID(),
  HargaFasilitasTambahanId: Type.foreignKeyUUID(),
  MasterTipePromoId: Type.foreignKeyUUID(),
  nilaiHarga: Type.uang(true),
  nilaiDiskon: Type.uang(),
  jumlahHarga: Type.uang(),
}

module.exports = {
  ...SequeliceMigration.createTable(tableName, (DataTypes) => {
    return columns
  }),
}
