const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterFungsiRuangan = require('../constants/ConstMasterFungsiRuangan')

const tableName = 'MasterFungsiRuangans'
const data = [
  {
    id: ConstMasterFungsiRuangan.MEETING,
    nama: 'Meeting',
  },
  {
    id: ConstMasterFungsiRuangan.WEDDING,
    nama: 'Wedding',
  },
  {
    id: ConstMasterFungsiRuangan.BALLROOM,
    nama: 'Ballroom',
  },
  {
    id: ConstMasterFungsiRuangan.BANQUET,
    nama: 'Banquet',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
