const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterTipeKasur = require('../constants/ConstMasterTipeKasur')

const tableName = 'MasterTipeKasurs'
const data = [
  {
    id: ConstMasterTipeKasur.DOUBLE,
    nama: 'Double',
  },
  {
    id: ConstMasterTipeKasur.TWIN,
    nama: 'Twin',
  },
  {
    id: ConstMasterTipeKasur.T5,
    nama: 'T5',
  },
  {
    id: ConstMasterTipeKasur.T3,
    nama: 'T3',
  },
  {
    id: ConstMasterTipeKasur.T2,
    nama: 'T2',
  },
  {
    id: ConstMasterTipeKasur.T1,
    nama: 'T1',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
