const tableName = 'ReservasiKamarItemKamars'
const tableName2 = 'LogCheckers'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'MasterTipeBarangId', {
        type: Sequelize.UUID,
      }),
      queryInterface.addColumn(tableName2, 'ReservasiKamarId', {
        type: Sequelize.UUID,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'MasterTipeBarangId'),
      queryInterface.removeColumn(tableName2, 'ReservasiKamarId'),
    ])
  },
}
