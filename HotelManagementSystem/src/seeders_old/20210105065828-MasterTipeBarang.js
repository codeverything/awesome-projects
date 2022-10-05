const SequeliceSeed = require('../helpers/SequeliceSeed')
const { ConstTipeItem } = require('../constants/index')

const tableName = 'MasterTipeBarangs'
const data = [
  {
    id: ConstTipeItem.LINEN,
    nama: 'Linen',
  },
  {
    id: ConstTipeItem.NON_LINEN,
    nama: 'Non Linen',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
