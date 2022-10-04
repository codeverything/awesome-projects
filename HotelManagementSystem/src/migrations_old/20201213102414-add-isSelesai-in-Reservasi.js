const tableName = 'Reservasis'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'isSelesai', {
        type: Sequelize.BOOLEAN,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn(tableName, 'isSelesai')])
  },
}
