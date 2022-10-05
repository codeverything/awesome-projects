const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterStatusKamar = require('../constants/ConstMasterStatusKamar')

const tableName = 'MasterStatusKamars'
const data = [
  {
    id: ConstMasterStatusKamar.CHECKED_IN,
    nama: 'Checked-in',
  },
  {
    id: ConstMasterStatusKamar.CHECKED_OUT,
    nama: 'Checked-out',
  },
  {
    id: ConstMasterStatusKamar.EXTENDED,
    nama: 'Extended',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
