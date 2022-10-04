import models from 'models'

const {
  City,
  MasterAgama,
  MasterJenisKelamin,
  MasterKewarganegaraan,
  MasterStatusPerkawinan,
  MasterTipeIdentitas,
  MasterTipeTamu,
} = models

export const includingGetAll = [
  {
    model: MasterTipeIdentitas,
  },
  {
    model: MasterAgama,
  },
  {
    model: MasterJenisKelamin,
  },
  {
    model: MasterKewarganegaraan,
  },
  {
    model: MasterTipeTamu,
  },
  {
    model: MasterStatusPerkawinan,
  },
  {
    model: City,
  },
]
