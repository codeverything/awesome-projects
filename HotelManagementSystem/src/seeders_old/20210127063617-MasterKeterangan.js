const SequeliceSeed = require('../helpers/SequeliceSeed')
const { ConstMasterKeterangan } = require('../constants/index')

const tableName = 'MasterKeterangans'
const data = [
  {
    id: ConstMasterKeterangan.HASIL_STOCK_OPNAME,
    nama: 'Hasil Stok Opname',
  },
  {
    id: ConstMasterKeterangan.PEMBELIAN_BARU,
    nama: 'Pembelian Baru',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
