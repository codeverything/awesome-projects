const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterFasilitasTambahan = require('../constants/ConstMasterFasilitasTambahan')

const tableName = 'LogHargaMasterFasilitasTambahans'
const data = [
  {
    MasterFasilitasTambahanId: ConstMasterFasilitasTambahan.BREAKFAST_OTA,
    id: '0fa97b19-d6dd-42fa-94e6-b9900a16e252',
    harga: 0,
  },
  {
    MasterFasilitasTambahanId: ConstMasterFasilitasTambahan.BREAKFAST,
    id: '4ea40026-338b-4a0f-abb5-9aade1d0a648',
    harga: 50000,
  },
  {
    MasterFasilitasTambahanId: ConstMasterFasilitasTambahan.EXTRA_BED,
    id: '8e3a6186-da6a-4b2a-b462-f535181d3fdf',
    harga: 50000,
  },
  {
    MasterFasilitasTambahanId: ConstMasterFasilitasTambahan.EXTRA_BED_OTA,
    id: '6233c274-ffa7-4558-9414-4808464bfa8b',
    harga: 0,
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
