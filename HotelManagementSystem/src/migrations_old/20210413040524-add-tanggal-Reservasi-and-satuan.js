const tableName = 'InvoiceTagihans'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'satuan', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn(tableName, 'tanggalMenginap', {
        type: Sequelize.STRING,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn(tableName, 'satuan')])
  },
}
