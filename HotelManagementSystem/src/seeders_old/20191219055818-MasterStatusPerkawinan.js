const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterStatusPerkawinan = require('../constants/ConstMasterStatusPerkawinan')

const tableName = 'MasterStatusPerkawinans'
const data = [
  {
    id: ConstMasterStatusPerkawinan.MENIKAH,
    nama: 'Menikah',
  },
  {
    id: ConstMasterStatusPerkawinan.BELUM_MENIKAH,
    nama: 'Belum Menikah',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
