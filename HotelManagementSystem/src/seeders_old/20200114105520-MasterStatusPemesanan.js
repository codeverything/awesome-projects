const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterStatusPemesanan = require('../constants/ConstMasterStatusPemesanan')

const tableName = 'MasterStatusPemesanans'
const data = [
  {
    id: ConstMasterStatusPemesanan.CHECKED_IN,
    nama: 'Checked-in',
  },
  {
    id: ConstMasterStatusPemesanan.CHECKED_OUT,
    nama: 'Checked-out',
  },
  {
    id: ConstMasterStatusPemesanan.RESERVED,
    nama: 'Reserved',
  },
  {
    id: ConstMasterStatusPemesanan.CANCELED,
    nama: 'Canceled',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
