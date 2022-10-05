const tableName = 'InvoiceTambahans'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'keterangan', {
        type: Sequelize.STRING,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn(tableName, 'keterangan')])
  },
}
