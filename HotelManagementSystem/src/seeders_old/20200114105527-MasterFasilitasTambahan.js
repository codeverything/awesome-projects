const SequeliceSeed = require('helpers/SequeliceSeed')
const {
  ConstMasterFasilitasTambahan,
  ConstMasterSourcePemesanan,
  ConstJenisFasilitasTambahan,
  ConstSatuan,
} = require('constants/index')

const tableName = 'MasterFasilitasTambahans'
const data = [
  {
    id: ConstMasterFasilitasTambahan.BREAKFAST,
    JenisFasilitasTambahanId: ConstJenisFasilitasTambahan.BREAKFAST,
    MasterSourcePemesananId: ConstMasterSourcePemesanan.WALK_IN,
    MasterSatuanId: ConstSatuan.PAX,
  },
  {
    id: ConstMasterFasilitasTambahan.BREAKFAST_OTA,
    JenisFasilitasTambahanId: ConstJenisFasilitasTambahan.BREAKFAST,
    MasterSourcePemesananId: ConstMasterSourcePemesanan.OTA,
    MasterSatuanId: ConstSatuan.PAX,
  },
  {
    id: ConstMasterFasilitasTambahan.EXTRA_BED,
    JenisFasilitasTambahanId: ConstJenisFasilitasTambahan.EXTRA_BED,
    MasterSourcePemesananId: ConstMasterSourcePemesanan.WALK_IN,
    MasterSatuanId: ConstSatuan.BUAH,
  },
  {
    id: ConstMasterFasilitasTambahan.EXTRA_BED_OTA,
    JenisFasilitasTambahanId: ConstJenisFasilitasTambahan.EXTRA_BED,
    MasterSourcePemesananId: ConstMasterSourcePemesanan.OTA,
    MasterSatuanId: ConstSatuan.BUAH,
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
