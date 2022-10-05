const ConstMasterAgama = require('../constants/ConstMasterAgama')

const data = [
  {
    id: ConstMasterAgama.ISLAM,
    nama: 'ISLAM',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: ConstMasterAgama.KRISTEN,
    nama: 'KRISTEN',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: ConstMasterAgama.KATOLIK,
    nama: 'KATOLIK',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: ConstMasterAgama.HINDU,
    nama: 'HINDU',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: ConstMasterAgama.BUDDHA,
    nama: 'BUDDHA',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: ConstMasterAgama.KONGHUCU,
    nama: 'KONGHUCU',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MasterAgamas', data, {
      updateOnDuplicate: ['id'],
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MasterAgamas', null, {})
  },
}
