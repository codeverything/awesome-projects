const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterTipePromo = require('../constants/ConstMasterTipePromo')

const tableName = 'MasterTipePromos'
const data = [
  {
    id: ConstMasterTipePromo.PERSENTASE,
    nama: 'Persentase (%)',
  },
  {
    id: ConstMasterTipePromo.NOMINAL,
    nama: 'Nominal',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
