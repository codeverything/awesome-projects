const tableName = 'InvoiceTambahans'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'HargaFasilitasTambahanId'),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'HargaFasilitasTambahanId', {
        type: Sequelize.UUID,
      }),
    ])
  },
}
