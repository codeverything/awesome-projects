const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterJenisJaminan = require('../constants/ConstMasterJenisJaminan')

const tableName = 'MasterJenisJaminans'
const data = [
  {
    id: ConstMasterJenisJaminan.KTP,
    nama: 'KTP',
  },
  {
    id: ConstMasterJenisJaminan.DEPOSIT,
    nama: 'Deposit',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
