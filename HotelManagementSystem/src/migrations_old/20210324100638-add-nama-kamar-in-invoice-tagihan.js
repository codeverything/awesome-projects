const tableName2 = 'InvoiceTagihans'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName2, 'namaSpesifikasiKamar', {
        type: Sequelize.STRING,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName2, 'namaSpesifikasiKamar'),
    ])
  },
}
