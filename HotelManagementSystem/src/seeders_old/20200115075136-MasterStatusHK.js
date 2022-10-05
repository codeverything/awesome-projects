const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterStatusHK = require('../constants/ConstMasterStatusHK')

const tableName = 'MasterStatusHKs'
const data = [
  {
    id: ConstMasterStatusHK.OUT_OF_OPERATION,
    nama: 'Out Of Operation',
  },
  {
    id: ConstMasterStatusHK.OWNER,
    nama: 'Owner',
  },
  {
    id: ConstMasterStatusHK.AVAILABLE_CLEAN,
    nama: 'Available, Clean',
  },
  {
    id: ConstMasterStatusHK.NEED_CHECK,
    nama: 'Need check',
  },
  {
    id: ConstMasterStatusHK.OCCUPIED_DIRTY,
    nama: 'Occupied, Dirty',
  },
  {
    id: ConstMasterStatusHK.VACANT_CLEAN,
    nama: 'Vacant, Clean',
  },
  {
    id: ConstMasterStatusHK.VACANT_DIRTY,
    nama: 'Vacant, Dirty',
  },
  {
    id: ConstMasterStatusHK.CHECKED,
    nama: 'Checked',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
