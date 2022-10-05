const SequeliceSeed = require('helpers/SequeliceSeed')
const ConstEarlyLateCharge = require('constants/ConstEarlyLateCharge')

const tableName = 'LogHargaEarlyLateCharges'
const data = [
  {
    id: '1',
    EarlyLateChargeId: ConstEarlyLateCharge.EARLY_CHECK_IN,
    harga: 30000,
    batasAkhirCheckIn: '13:00:00',
    batasAkhirCheckInFullDay: '07:00:00',
  },
  {
    id: '2',
    EarlyLateChargeId: ConstEarlyLateCharge.LATE_CHECK_OUT,
    harga: 40000,
    mulaiLateCheckOut: '14:00',
    mulaiLateCheckOutFullDay: '18:00',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
