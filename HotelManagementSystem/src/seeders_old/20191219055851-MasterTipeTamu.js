const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterTipeTamu = require('../constants/ConstMasterTipeTamu')

const tableName = 'MasterTipeTamus'
const data = [
  {
    id: ConstMasterTipeTamu.COORPORATE,
    nama: 'Coorporate',
  },
  {
    id: ConstMasterTipeTamu.GUEST,
    nama: 'Guest',
  },
  {
    id: ConstMasterTipeTamu.MEMBER,
    nama: 'Member',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
