const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterSetupRuangan = require('../constants/ConstMasterSetupRuangan')

const tableName = 'MasterSetupRuangans'
const data = [
  {
    id: ConstMasterSetupRuangan.BOARD,
    nama: 'Board',
  },
  {
    id: ConstMasterSetupRuangan.CLASSROOM,
    nama: 'Classroom',
  },
  {
    id: ConstMasterSetupRuangan.ROUND_TABLE,
    nama: 'Round Table',
  },
  {
    id: ConstMasterSetupRuangan.U_SHAPE,
    nama: 'U-Shape',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
