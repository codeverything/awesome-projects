const tableName = 'Reservasis'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'totalPembayaran', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn(tableName, 'totalTagihan', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn(tableName, 'balance', {
        type: Sequelize.INTEGER,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'totalPembayaran'),
      queryInterface.removeColumn(tableName, 'totalTagihan'),
      queryInterface.removeColumn(tableName, 'balance'),
    ])
  },
}
