const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterSourcePemesanan = require('../constants/ConstMasterSourcePemesanan')

const tableName = 'MasterSourcePemesanans'
const data = [
  {
    id: ConstMasterSourcePemesanan.OTA,
    nama: 'OTA',
  },
  {
    id: ConstMasterSourcePemesanan.WALK_IN,
    nama: 'Walk-in',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
