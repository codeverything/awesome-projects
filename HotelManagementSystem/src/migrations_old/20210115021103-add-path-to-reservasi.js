const tableName = 'Reservasis'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'path', {
        type: Sequelize.STRING,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn(tableName, 'path')])
  },
}
