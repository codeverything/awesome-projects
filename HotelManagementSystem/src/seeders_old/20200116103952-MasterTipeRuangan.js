const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterTipeRuangan = require('../constants/ConstMasterTipeRuangan')

const tableName = 'MasterTipeRuangans'
const data = [
  {
    id: ConstMasterTipeRuangan.HALF_DAY,
    nama: 'Half Day',
  },
  {
    id: ConstMasterTipeRuangan.FULL_DAY,
    nama: 'Full Day',
  },
  {
    id: ConstMasterTipeRuangan.FULL_BOARD,
    nama: 'Full Board',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
