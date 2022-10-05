import models from 'models'

const {
  MasterTagihanKerusakanKehilangan,
  Kamar,
  MasterStatusHK,
  MasterFasilitasTambahan,
  JenisFasilitasTambahan,
  LogHargaMasterFasilitasTambahan,
} = models

export const detailKerusakanInclude = [
  {
    model: MasterTagihanKerusakanKehilangan,
  },
]

export const dataReservasiKamarInclude = [
  {
    model: Kamar,
    attributes: ['nomor'],
    include: [
      {
        model: MasterStatusHK,
        attributes: ['nama'],
      },
    ],
  },
]

export const reservasiFasilitasTambahanInclude = [
  {
    model: MasterFasilitasTambahan,
    attributes: {
      exclude: ['JenisFasilitasTambahanId', 'MasterSourcePemesananId'],
    },
    include: [
      {
        model: JenisFasilitasTambahan,
      },
      {
        model: LogHargaMasterFasilitasTambahan,
        attributes: { exclude: ['MasterFasilitasTambahanId'] },
      },
    ],
  },
]
