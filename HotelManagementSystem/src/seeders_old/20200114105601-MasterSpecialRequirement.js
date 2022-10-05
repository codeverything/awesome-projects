const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterSpecialRequirement = require('../constants/ConstMasterSpecialRequirement')

const tableName = 'MasterSpecialRequirements'
const data = [
  {
    id: ConstMasterSpecialRequirement.NO_SMOKING,
    nama: 'No Smoking',
  },
  {
    id: ConstMasterSpecialRequirement.SMOKING,
    nama: 'Smoking',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
