const tableName = 'ReservasiKamars'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'tanggalDiambil', {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn(tableName, 'diambilOleh', {
        type: Sequelize.STRING,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'tanggalDiambil'),
      queryInterface.removeColumn(tableName, 'diambilOleh'),
    ])
  },
}
