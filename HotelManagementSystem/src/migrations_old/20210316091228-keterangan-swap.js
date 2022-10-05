const tableName = 'InvoiceTambahans'
const tableName2 = 'ReservasiKamars'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName2, 'isSwap', {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn(tableName, 'keteranganSwap', {
        type: Sequelize.STRING,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'keteranganSwap'),
      queryInterface.removeColumn(tableName2, 'isSwap'),
    ])
  },
}
