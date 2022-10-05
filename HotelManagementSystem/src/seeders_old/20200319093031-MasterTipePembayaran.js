const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterTipePembayaran = require('../constants/ConstMasterTipePembayaran')

const tableName = 'MasterTipePembayarans'
const data = [
  {
    id: ConstMasterTipePembayaran.CASH,
    nama: 'Cash',
  },
  {
    id: ConstMasterTipePembayaran.KARTU_KREDIT,
    nama: 'Kartu Kredit',
  },
  {
    id: ConstMasterTipePembayaran.KARTU_DEBIT,
    nama: 'Kartu Debit',
  },
  {
    id: ConstMasterTipePembayaran.TRANSFER_BANK,
    nama: 'Transfer Bank',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
