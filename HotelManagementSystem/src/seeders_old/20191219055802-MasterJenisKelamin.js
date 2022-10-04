import ConstMasterJenisKelamin from 'constants/ConstMasterJenisKelamin'

const SequeliceSeed = require('../helpers/SequeliceSeed')

const data = [
  {
    id: ConstMasterJenisKelamin.PRIA,
    nama: 'Laki-Laki',
  },
  {
    id: ConstMasterJenisKelamin.WANITA,
    nama: 'Wanita',
  },
]

module.exports = SequeliceSeed.createSeedData('MasterJenisKelamins', data)
