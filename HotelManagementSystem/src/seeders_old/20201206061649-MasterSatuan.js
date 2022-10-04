const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterSatuan = require('../constants/ConstMasterSatuan')

const tableName = 'MasterSatuans'
const data = [
  {
    id: ConstMasterSatuan.BUAH,
    nama: 'Buah',
  },
  {
    id: ConstMasterSatuan.MALAM,
    nama: 'Malam',
  },
  {
    id: ConstMasterSatuan.PAX,
    nama: 'Pax',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
