const tableName = 'Reservasis'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(tableName, 'MasterJenisJaminanId', {
        type: Sequelize.UUID,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(tableName, 'MasterJenisJaminanId', {
        type: Sequelize.UUID,
      }),
    ])
  },
}
