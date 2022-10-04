const SequeliceSeed = require('../helpers/SequeliceSeed')
const ConstMasterOTA = require('../constants/ConstMasterOTA')

const tableName = 'MasterOTAs'
const data = [
  {
    id: ConstMasterOTA.BLIBLI,
    nama: 'Blibli',
  },
  {
    id: ConstMasterOTA.PEGIPEGI,
    nama: 'Pegipegi',
  },
  {
    id: ConstMasterOTA.TRAVELOKA,
    nama: 'Traveloka',
  },
  {
    id: ConstMasterOTA.BOOKINGCOM,
    nama: 'Booking.com',
  },
  {
    id: ConstMasterOTA.BAYUBUANA,
    nama: 'BayuBuana',
  },
  {
    id: ConstMasterOTA.AIRY,
    nama: 'Airy',
  },
  {
    id: ConstMasterOTA.AGODA,
    nama: 'Agoda',
  },
  {
    id: ConstMasterOTA.MISTERALADIN,
    nama: 'Mister Aladin',
  },
  {
    id: ConstMasterOTA.EXPEDIA,
    nama: 'Expedia',
  },
  {
    id: ConstMasterOTA.KAHA,
    nama: 'KAHA',
  },
  {
    id: ConstMasterOTA.MGHOLIDAY,
    nama: 'MG Holiday',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
