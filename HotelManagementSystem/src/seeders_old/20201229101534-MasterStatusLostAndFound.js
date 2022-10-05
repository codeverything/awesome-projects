const SequeliceSeed = require('../helpers/SequeliceSeed')
const { ConstMasterStatusLostAndFound } = require('../constants/index')

const tableName = 'MasterStatusLostAndFounds'
const data = [
  {
    id: ConstMasterStatusLostAndFound.TERTINGGAL,
    nama: 'Tertinggal',
  },
  {
    id: ConstMasterStatusLostAndFound.DIAMBIL,
    nama: 'Diambil',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
