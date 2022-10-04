const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstItemRuangan = require('../constants/ConstItemRuangan')

const tableName = 'ItemRuangans'
const data = [
  {
    id: ConstItemRuangan.MICROPHONE,
    nama: 'Microphone',
  },
  {
    id: ConstItemRuangan.PROJECTOR,
    nama: 'Projector',
  },
  {
    id: ConstItemRuangan.SPEAKER,
    nama: 'Speaker',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
