const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterTipeRefund = require('../constants/ConstMasterTipeRefund')

const tableName = 'MasterTipeRefunds'
const data = [
  {
    id: ConstMasterTipeRefund.PEMBATALAN,
    nama: 'Pembatalan',
  },
  {
    id: ConstMasterTipeRefund.EARLY_CHECK_OUT,
    nama: 'Early Check Out',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
