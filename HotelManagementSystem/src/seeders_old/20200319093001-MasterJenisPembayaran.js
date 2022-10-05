const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterJenisPembayaran = require('../constants/ConstMasterJenisPembayaran')

const tableName = 'MasterJenisPembayarans'
const data = [
  {
    id: ConstMasterJenisPembayaran.PREPAID,
    nama: 'Prepaid',
  },
  {
    id: ConstMasterJenisPembayaran.PAY_AT_HOTEL,
    nama: 'Pay At Hotel',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
