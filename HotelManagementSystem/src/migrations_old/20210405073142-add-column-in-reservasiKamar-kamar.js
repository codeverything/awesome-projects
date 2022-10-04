const tableName = 'ReservasiKamarKamars'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'diambilOleh', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn(tableName, 'tanggalDiambil', {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn(tableName, 'atasNama', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn(tableName, 'MasterStatusLostAndFoundId', {
        type: Sequelize.UUID,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'diambilOleh'),
      queryInterface.removeColumn(tableName, 'tanggalDiambil'),
      queryInterface.removeColumn(tableName, 'atasNama'),
      queryInterface.removeColumn(tableName, 'MasterStatusLostAndFoundId'),
    ])
  },
}
