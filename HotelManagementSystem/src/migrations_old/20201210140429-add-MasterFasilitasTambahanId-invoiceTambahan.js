const tableName = 'InvoiceTambahans'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'MasterFasilitasTambahanId', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn(tableName, 'MasterSatuanId', {
        type: Sequelize.STRING,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'MasterFasilitasTambahanId'),
      queryInterface.removeColumn(tableName, 'MasterSatuanId'),
    ])
  },
}
