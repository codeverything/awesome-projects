const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterKewarganegaraan = require('../constants/ConstMasterKewarganegaraan')

const tableName = 'MasterKewarganegaraans'
const data = [
  {
    id: ConstMasterKewarganegaraan.WNA,
    nama: 'WNA',
  },
  {
    id: ConstMasterKewarganegaraan.WNI,
    nama: 'WNI',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
