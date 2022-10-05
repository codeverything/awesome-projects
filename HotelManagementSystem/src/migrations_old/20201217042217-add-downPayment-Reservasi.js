const tableName = 'Reservasis'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'downPayment', {
        type: Sequelize.INTEGER,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn(tableName, 'downPayment')])
  },
}
