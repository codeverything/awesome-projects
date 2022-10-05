const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterJenisVendorLaundry = require('../constants/ConstMasterJenisVendorLaundry')

const tableName = 'MasterJenisVendorLaundries'
const data = [
  {
    id: ConstMasterJenisVendorLaundry.INTERNAL,
    nama: 'Internal',
  },
  {
    id: ConstMasterJenisVendorLaundry.EXSTERNAL,
    nama: 'Eksternal',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
