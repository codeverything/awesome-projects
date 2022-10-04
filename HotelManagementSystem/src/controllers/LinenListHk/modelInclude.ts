import models from 'models'

const { Linen, VendorLaundry, MasterCategory, Kamar, SpesifikasiKamar } = models

export const includeLogLaundryMain = [
  { model: Linen },
  { model: VendorLaundry },
]

export const includeLogLaundryStock = [{ model: MasterCategory }]

export const includeUsedLinen = [
  {
    model: Kamar,
    include: [
      {
        model: SpesifikasiKamar,
      },
    ],
  },
]

export const includeLaundryHK = [
  {
    model: VendorLaundry,
  },
]
