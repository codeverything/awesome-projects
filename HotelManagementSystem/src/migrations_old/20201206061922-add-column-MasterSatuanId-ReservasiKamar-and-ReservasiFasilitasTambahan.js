const tableName = 'ReservasiKamars'
const tableName2 = 'ReservasiFasilitasTambahans'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'MasterSatuanId', {
        type: Sequelize.UUID,
      }),
      queryInterface.addColumn(tableName2, 'MasterSatuanId', {
        type: Sequelize.UUID,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'MasterSatuanId'),
      queryInterface.removeColumn(tableName2, 'MasterSatuanId'),
    ])
  },
}
