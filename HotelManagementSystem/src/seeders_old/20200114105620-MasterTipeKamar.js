const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterTipeKamar = require('../constants/ConstMasterTipeKamar')

const tableName = 'MasterTipeKamars'
const data = [
  {
    id: ConstMasterTipeKamar.DELUXE,
    nama: 'Deluxe Room',
  },
  {
    id: ConstMasterTipeKamar.STANDAR,
    nama: 'Standar Room',
  },
  {
    id: ConstMasterTipeKamar.SUITE,
    nama: 'Suite Room',
  },
  {
    id: ConstMasterTipeKamar.SUPERIOR,
    nama: 'Superior Room',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
