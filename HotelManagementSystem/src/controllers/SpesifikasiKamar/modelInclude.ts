import models from 'models'

const {
  Linen,
  ItemKamar,
  MasterTipeKamar,
  MasterTipeKasur,
  MasterSpecialRequirement,
  LogHargaDefaultSpesifikasiKamar,
} = models

export const includeGetOne = [
  {
    model: MasterTipeKamar,
  },
  {
    model: MasterTipeKasur,
  },
  {
    model: MasterSpecialRequirement,
  },
  {
    model: LogHargaDefaultSpesifikasiKamar,
  },
  {
    model: Linen,
    attributes: { exclude: ['jumlah', 'createdAt', 'updatedAt'] },
    through: {
      attributes: [],
    },
  },
  {
    model: ItemKamar,
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    through: {
      attributes: [],
    },
  },
]

export const including = [
  {
    model: MasterTipeKamar,
  },
  {
    model: MasterTipeKasur,
  },
  {
    model: MasterSpecialRequirement,
  },
]
