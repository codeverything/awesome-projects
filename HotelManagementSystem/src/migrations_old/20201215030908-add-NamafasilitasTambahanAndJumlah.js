const tableName = 'InvoiceTambahans'
const tableName2 = 'InvoiceTagihans'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'keteranganFasilitasTambahan', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn(tableName2, 'keteranganFasilitasTambahan', {
        type: Sequelize.STRING,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'keteranganFasilitasTambahan'),
      queryInterface.removeColumn(tableName2, 'keteranganFasilitasTambahan'),
    ])
  },
}
