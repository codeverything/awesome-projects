const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterCheckKamar = require('../constants/ConstStatusCheckKamar')

const tableName = 'MasterStatusCheckKamars'
const data = [
  {
    id: ConstMasterCheckKamar.CHECK,
    nama: 'Check Kamar',
  },
  {
    id: ConstMasterCheckKamar.SEDANG_CHECK,
    nama: 'Sedang Dicheck',
  },
  {
    id: ConstMasterCheckKamar.SUDAH_CHECK,
    nama: 'Sudah Dicheck',
  },
  {
    id: ConstMasterCheckKamar.TAGIHAN,
    nama: 'Tagihan',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
