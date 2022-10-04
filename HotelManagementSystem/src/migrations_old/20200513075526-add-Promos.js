const tableName = 'Promos'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'nilai', {
        type: Sequelize.BIGINT,
      }),
      queryInterface.addColumn(tableName, 'MasterTipePromoId', {
        type: Sequelize.UUID,
      }),
      queryInterface.addColumn(tableName, 'kode', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn(tableName, 'sisaKuota', {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'nilai'),
      queryInterface.removeColumn(tableName, 'MasterTipePromoId'),
      queryInterface.removeColumn(tableName, 'kode'),
      queryInterface.removeColumn(tableName, 'sisaKuota'),
    ])
  },
}
