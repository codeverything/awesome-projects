import models from 'models'

const { Linen, VendorLaundry } = models

export const includeLogLaundry = [
  {
    model: Linen,
  },
  {
    model: VendorLaundry,
  },
]
