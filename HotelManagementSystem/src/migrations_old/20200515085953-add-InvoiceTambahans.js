const tableName = 'InvoiceTambahans'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'LogHargaDefaultSpesifikasiKamarId', {
        type: Sequelize.UUID,
      }),
      queryInterface.addColumn(tableName, 'LogHargaMasterFasilitasTambahanId', {
        type: Sequelize.UUID,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        tableName,
        'LogHargaDefaultSpesifikasiKamarId'
      ),
      queryInterface.removeColumn(
        tableName,
        'LogHargaMasterFasilitasTambahanId'
      ),
    ])
  },
}
