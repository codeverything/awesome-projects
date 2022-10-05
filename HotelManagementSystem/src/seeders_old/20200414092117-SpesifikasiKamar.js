const SequeliceSeed = require('../helpers/SequeliceSeed')
const AppConst = require('../constants')

const tableName = 'SpesifikasiKamars'
const data = [
  {
    id: '6da592d6-4de8-43a5-a45a-49039612857d',
    createdAt: '2020-04-14 16:07:41',
    updatedAt: '2020-04-14 16:07:41',
    nama: 'Standar - Double - No Smoking',
    MasterTipeKamarId: AppConst.ConstMasterTipeKamar.STANDAR,
    MasterTipeKasurId: AppConst.ConstMasterTipeKasur.DOUBLE,
    MasterSpecialRequirementId:
      AppConst.ConstMasterSpecialRequirement.NO_SMOKING,
    maxTamu: 1,
  },
  {
    id: '9ea2cd96-6e7a-43c8-8ef1-f38adaaa1f13',
    createdAt: '2020-04-14 16:08:28',
    updatedAt: '2020-04-14 16:08:28',
    nama: 'Standar - Twin - No Smoking',
    MasterTipeKamarId: AppConst.ConstMasterTipeKamar.STANDAR,
    MasterTipeKasurId: AppConst.ConstMasterTipeKasur.TWIN,
    MasterSpecialRequirementId:
      AppConst.ConstMasterSpecialRequirement.NO_SMOKING,
    maxTamu: 1,
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
