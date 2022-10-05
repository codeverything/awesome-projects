const SequeliceSeed = require('helpers/SequeliceSeed')
const ConstMasterStatusPembayaran = require('constants/ConstMasterStatusPembayaran')

const data = [
  {
    id: ConstMasterStatusPembayaran.BELUM_LUNAS,
    nama: 'Belum Lunas',
  },
  {
    id: ConstMasterStatusPembayaran.LUNAS,
    nama: 'Lunas',
  },
  {
    id: ConstMasterStatusPembayaran.VOID,
    nama: 'Void',
  },
  {
    id: ConstMasterStatusPembayaran.REFUND,
    nama: 'Refund',
  },
]

module.exports = SequeliceSeed.createSeedData('MasterStatusPembayarans', data)
