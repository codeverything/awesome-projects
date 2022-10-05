import models from 'models'

const {
  SpesifikasiKamar,
  MasterTipeKamar,
  MasterTipeKasur,
  MasterStatusKamar,
  MasterStatusHK,
  HargaSpesifikasiKamar,
  ConnectingDoor,
  LogHargaDefaultSpesifikasiKamar,
} = models

export const includingGetAll = [
  {
    model: ConnectingDoor,
  },
  {
    model: SpesifikasiKamar,
    include: [
      { model: MasterTipeKamar },
      { model: MasterTipeKasur },
      {
        model: LogHargaDefaultSpesifikasiKamar,
      },
      {
        model: HargaSpesifikasiKamar,
      },
    ],
  },

  {
    model: MasterStatusHK,
  },
  {
    model: MasterStatusKamar,
  },
]

export const includingOne = [
  {
    model: ConnectingDoor,
  },
  {
    model: SpesifikasiKamar,
    include: [
      { model: MasterTipeKamar },
      { model: MasterTipeKasur },
      {
        model: HargaSpesifikasiKamar,
      },
    ],
  },
  {
    model: MasterStatusHK,
  },
  {
    model: MasterStatusKamar,
  },
]
