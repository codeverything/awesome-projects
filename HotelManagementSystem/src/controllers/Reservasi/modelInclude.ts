import models from 'models'

const {
  MasterTipePembayaran,
  MasterItemPembayaran,
  LogHargaMasterFasilitasTambahan,
  ReservasiFasilitasTambahan,
  Promo,
  MasterTipeKamar,
  InformasiOrang,
  MasterTipeTamu,
  MasterStatusPembayaran,
  JenisFasilitasTambahan,
  MasterFasilitasTambahan,
  MasterJenisJaminan,
  MasterJenisKelamin,
  MasterJenisPembayaran,
  MasterSourcePemesanan,
  MasterSpecialRequirement,
  MasterStatusPemesanan,
  MasterStatusPerkawinan,
  MasterTipeKasur,
  MasterTipePromo,
  MasterStatusKamar,
  ReservasiKamar,
  SpesifikasiKamar,
  HargaSpesifikasiKamar,
  Kamar,
  MasterStatusCheckKamar,
  MasterSatuan,
  MasterItemTagihan,
  MasterOTA,
  MasterTipeIdentitas,
  Perusahaan,
} = models

export const includingGetAll = [
  {
    model: InformasiOrang,
    paranoid: false,
    include: [
      {
        model: MasterTipeTamu,
      },
      {
        model: Perusahaan,
      },
    ],
  },
  {
    model: Perusahaan,
    paranoid: false,
  },
  {
    model: MasterTipeTamu,
  },
  {
    model: MasterJenisPembayaran,
  },
  {
    model: MasterOTA,
  },
  {
    model: MasterStatusPembayaran,
  },
  {
    model: MasterStatusPemesanan,
  },
  {
    model: MasterSourcePemesanan,
  },
  {
    model: ReservasiKamar,
    include: [
      { model: Kamar },
      { model: MasterStatusKamar },
      { model: MasterSatuan },
      { model: SpesifikasiKamar },
    ],
  },
]

export const includeTambahan = [
  {
    model: MasterFasilitasTambahan,
    include: [
      { model: JenisFasilitasTambahan },
      { model: LogHargaMasterFasilitasTambahan },
      {
        model: MasterSatuan,
      },
    ],
  },
  {
    model: MasterItemTagihan,
  },
  {
    model: HargaSpesifikasiKamar,
  },
  {
    model: ReservasiKamar,
    include: [
      { model: SpesifikasiKamar },
      {
        model: MasterSatuan,
      },
    ],
  },
  {
    model: ReservasiFasilitasTambahan,
    include: [
      {
        model: MasterFasilitasTambahan,
        include: [
          { model: JenisFasilitasTambahan },
          { model: LogHargaMasterFasilitasTambahan },
          {
            model: MasterSatuan,
          },
        ],
      },
      {
        model: MasterSatuan,
      },
    ],
  },
  {
    model: MasterSatuan,
  },
]

export const includingGetOne = [
  {
    model: Promo,
  },
  {
    model: InformasiOrang,
    paranoid: false,
    include: [
      { model: MasterTipeTamu },
      { model: MasterJenisKelamin },
      { model: MasterStatusPerkawinan },
    ],
  },
  {
    model: Perusahaan,
    paranoid: false,
  },
  {
    model: MasterStatusPemesanan,
  },
  {
    model: MasterTipeIdentitas,
  },
  {
    model: MasterJenisJaminan,
  },
  {
    model: MasterJenisPembayaran,
  },
  { model: MasterTipePromo },
  {
    model: ReservasiKamar,
    include: [
      { model: Kamar },
      { model: SpesifikasiKamar, include: [{ model: HargaSpesifikasiKamar }] },
      { model: MasterTipeKamar },
      { model: MasterTipeKasur },
      { model: MasterStatusKamar },
      { model: MasterStatusCheckKamar },
      { model: MasterSatuan },
      { model: MasterSpecialRequirement },
      {
        model: ReservasiFasilitasTambahan,
        include: [
          {
            include: [
              { model: JenisFasilitasTambahan },
              { model: LogHargaMasterFasilitasTambahan },
              {
                model: MasterSatuan,
              },
            ],
            model: MasterFasilitasTambahan,
          },
          {
            model: MasterSatuan,
          },
        ],
      },
    ],
  },
  {
    model: MasterSourcePemesanan,
  },
  {
    model: MasterStatusPembayaran,
  },
]

export const includeDetailInvoice = [
  {
    model: ReservasiKamar,
    include: [
      {
        model: MasterSatuan,
      },
      {
        model: SpesifikasiKamar,
        include: [
          {
            model: HargaSpesifikasiKamar,
          },
        ],
      },
    ],
  },
  {
    model: ReservasiFasilitasTambahan,
    include: [
      {
        model: MasterFasilitasTambahan,
        include: [
          {
            model: JenisFasilitasTambahan,
          },
          {
            model: MasterSatuan,
          },
        ],
      },
      {
        model: MasterSatuan,
      },
    ],
  },
]

export const includeBaseInvoice = [
  {
    model: MasterItemPembayaran,
  },
  {
    model: MasterTipePembayaran,
  },
]

export const includeReservasi = [
  { model: Kamar },
  {
    model: SpesifikasiKamar,
    include: [{ model: HargaSpesifikasiKamar }],
  },
  { model: MasterTipeKamar },
  { model: MasterTipeKasur },
  { model: MasterStatusKamar },
  { model: MasterStatusCheckKamar },
  { model: MasterSatuan },
  { model: MasterSpecialRequirement },
  {
    model: ReservasiFasilitasTambahan,
    include: [
      {
        include: [
          { model: JenisFasilitasTambahan },
          { model: LogHargaMasterFasilitasTambahan },
          {
            model: MasterSatuan,
          },
        ],
        model: MasterFasilitasTambahan,
      },
      {
        model: MasterSatuan,
      },
    ],
  },
]
export const includeGetDetailInvoice = [
  {
    model: MasterStatusPembayaran,
  },
  {
    model: InformasiOrang,
    paranoid: false,
  },
  {
    model: ReservasiKamar,
    attributes: ['KamarId'],
    include: [
      {
        model: Kamar,
        attributes: ['nomor'],
      },
    ],
  },
  {
    model: MasterSourcePemesanan,
  },
]
