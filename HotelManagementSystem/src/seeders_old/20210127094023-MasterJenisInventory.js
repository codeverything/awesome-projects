const SequeliceSeed = require('../helpers/SequeliceSeed')
const { ConstMasterJenisInventory } = require('../constants/index')

const tableName = 'MasterJenisInventories'
const data = [
  {
    id: ConstMasterJenisInventory.AMENITY,
    nama: 'Amenities',
  },
  {
    id: ConstMasterJenisInventory.LINEN,
    nama: 'Linen',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
