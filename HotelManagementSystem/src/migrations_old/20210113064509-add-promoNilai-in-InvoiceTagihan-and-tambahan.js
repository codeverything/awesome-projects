const tableName = 'InvoiceTagihans'
const tableName2 = 'InvoiceTambahans'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'promoNilai', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn(tableName2, 'promoNilai', {
        type: Sequelize.INTEGER,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'promoNilai'),
      queryInterface.removeColumn(tableName2, 'promoNilai'),
    ])
  },
}
