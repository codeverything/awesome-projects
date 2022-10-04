const tableName2 = 'Roles'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName2, 'hakAkses', {
        type: Sequelize.JSON,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn(tableName2, 'hakAkses')])
  },
}
