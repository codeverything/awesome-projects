const tableName = 'LostAndFounds'
const tableName2 = 'LogLostAndFounds'
const tableName3 = 'AmenitySupplies'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'ReservasiKamarId', {
        type: Sequelize.UUID,
      }),
      queryInterface.addColumn(tableName2, 'ReservasiKamarId', {
        type: Sequelize.UUID,
      }),
      queryInterface.addColumn(tableName3, 'ReservasiKamarId', {
        type: Sequelize.UUID,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'ReservasiKamarId'),
      queryInterface.removeColumn(tableName2, 'ReservasiKamarId'),
      queryInterface.removeColumn(tableName3, 'ReservasiKamarId'),
    ])
  },
}
