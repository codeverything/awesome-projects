import models from 'models'

const {
  SpesifikasiKamar,
  MasterStatusHK,
  Linen,
  ItemKamar,
  MasterTagihanKerusakanKehilangan,
  MasterTipeBarang,
} = models
const includingGetAll = [
  {
    model: SpesifikasiKamar,
    attributes: ['nama', 'maxTamu'],
  },
  {
    model: MasterStatusHK,
  },
]
const includeGetOne = [
  {
    model: SpesifikasiKamar,
    include: [
      {
        model: Linen,
      },
    ],
  },
  {
    model: MasterStatusHK,
  },
]
const includeReservasiItemKamar = [
  {
    model: Linen,
  },
  {
    model: ItemKamar,
  },
  {
    model: MasterTagihanKerusakanKehilangan,
  },
  {
    model: MasterTipeBarang,
  },
]
const includeAmenity = [
  {
    model: Linen,
  },
]

export {
  includeGetOne,
  includeReservasiItemKamar,
  includingGetAll,
  includeAmenity,
}
