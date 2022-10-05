const SequeliceSeed = require('helpers/SequeliceSeed')
const ConstJenisFasilitasTambahan = require('constants/ConstJenisFasilitasTambahan')

const tableName = 'JenisFasilitasTambahans'
const data = [
  {
    id: ConstJenisFasilitasTambahan.BREAKFAST,
    nama: 'Breakfast',
  },
  {
    id: ConstJenisFasilitasTambahan.EXTRA_BED,
    nama: 'Extra Bed',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
