const tableName = 'LogLinens'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'MasterCategoryId', {
        type: Sequelize.UUID,
      }),
      queryInterface.addColumn(tableName, 'log', {
        type: Sequelize.STRING,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'MasterCategoryId'),
      queryInterface.removeColumn(tableName, 'log'),
    ])
  },
}
