import model from 'models'

const { MasterCategory, MasterJenisInventory } = model

export const getAll = [
  { model: MasterCategory },
  { model: MasterJenisInventory },
]
