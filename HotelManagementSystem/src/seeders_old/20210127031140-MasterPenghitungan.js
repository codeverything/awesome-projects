const SequeliceSeed = require('../helpers/SequeliceSeed')
const { ConstMasterPenghitungan } = require('../constants/index')

const tableName = 'MasterPenghitungans'
const data = [
  {
    id: ConstMasterPenghitungan.PENAMBAHAN,
    nama: 'Tambah',
  },
  {
    id: ConstMasterPenghitungan.PENGURANGAN,
    nama: 'Kurang',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
