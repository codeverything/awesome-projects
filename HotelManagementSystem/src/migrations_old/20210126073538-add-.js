const tableName = 'LinenSupplyChains'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'ReservasiKamarId', {
        type: Sequelize.UUID,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'ReservasiKamarId'),
    ])
  },
}
