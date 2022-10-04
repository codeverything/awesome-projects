const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterItemPembayaran = require('../constants/ConstMasterItemPembayaran')

const tableName = 'MasterItemPembayarans'
const data = [
  {
    id: ConstMasterItemPembayaran.PEMBAYARAN,
    nama: 'Pembayaran',
  },
  {
    id: ConstMasterItemPembayaran.DEPOSIT,
    nama: 'Deposit',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
