const tableName = 'MasterFasilitasTambahans'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'MasterSourcePemesananId', {
        type: Sequelize.UUID,
      }),
      queryInterface.addColumn(tableName, 'JenisFasilitasTambahanId', {
        type: Sequelize.UUID,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'MasterSourcePemesananId'),
      queryInterface.removeColumn(tableName, 'JenisFasilitasTambahanId'),
    ])
  },
}
