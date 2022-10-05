const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterTagihan = require('../constants/ConsMasterTagihan')

const tableName = 'MasterStatusTagihans'
const data = [
  {
    id: ConstMasterTagihan.TAGIHKAN,
    nama: 'Tagihkan',
  },
  {
    id: ConstMasterTagihan.TIDAK_TAGIHKAN,
    nama: 'Tidak Tagihkan',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
