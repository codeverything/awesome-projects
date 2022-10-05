const SequeliceSeed = require('helpers/SequeliceSeed')
const ConstEarlyLateCharge = require('constants/ConstEarlyLateCharge')

const tableName = 'EarlyLateCharges'
const data = [
  {
    id: ConstEarlyLateCharge.EARLY_CHECK_IN,
    nama: 'Early Check In',
  },
  {
    id: ConstEarlyLateCharge.LATE_CHECK_OUT,
    nama: 'Late Check Out',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
