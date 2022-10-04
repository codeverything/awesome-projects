const SequeliceSeed = require('../helpers/SequeliceSeed')
const { ConstRole } = require('../constants')

const tableName = 'Roles'
const data = [
  {
    id: ConstRole.SUPERADMIN,
    nama: 'Superadmin',
  },
  {
    id: ConstRole.FRONT_OFFICE,
    nama: 'Front Office',
  },
  {
    id: ConstRole.HK_LEADER,
    nama: 'HouseKeeping Leader',
  },
  {
    id: ConstRole.HK_STAFF,
    nama: 'HouseKeeping Staff',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
