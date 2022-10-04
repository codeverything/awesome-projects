const SequeliceSeed = require('../helpers/SequeliceSeed')
const { ConstMasterCategory } = require('../constants/index')

const tableName = 'MasterCategories'
const data = [
  {
    id: ConstMasterCategory.LAUNDRY,
    nama: 'Laundry',
  },
  {
    id: ConstMasterCategory.UPDATE_STOCK,
    nama: 'Update Stock',
  },
  {
    id: ConstMasterCategory.BERSIH_KAMAR,
    nama: 'Membersihkan Kamar',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
