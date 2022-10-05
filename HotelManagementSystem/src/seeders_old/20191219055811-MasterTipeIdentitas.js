const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterTipeIdentitas = require('../constants/ConstMasterTipeIdentitas')

const data = [
  {
    id: ConstMasterTipeIdentitas.SIM,
    nama: 'SIM',
  },
  {
    id: ConstMasterTipeIdentitas.KITAS,
    nama: 'KITAS',
  },
  {
    id: ConstMasterTipeIdentitas.KTP,
    nama: 'KTP',
  },
]

module.exports = SequeliceSeed.createSeedData('MasterTipeIdentitases', data)
