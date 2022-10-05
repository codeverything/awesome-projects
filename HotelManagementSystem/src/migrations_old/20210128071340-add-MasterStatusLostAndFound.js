const tableName = 'ReservasiKamars'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'MasterStatusLostAndFoundId', {
        type: Sequelize.UUID,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'InformasiOrangId'),
    ])
  },
}
