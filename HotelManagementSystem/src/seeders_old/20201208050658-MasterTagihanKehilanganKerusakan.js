const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterTagihanKerusakanKehilangan = require('../constants/ConstMasterTagihanKerusakanKehilangan')

const tableName = 'MasterTagihanKerusakanKehilangans'
const data = [
  {
    id: ConstMasterTagihanKerusakanKehilangan.HILANG,
    nama: 'Hilang',
  },
  {
    id: ConstMasterTagihanKerusakanKehilangan.RUSAK,
    nama: 'Rusak',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
