const tableName = 'MasterFasilitasTambahans'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'MasterSatuanId', {
        type: Sequelize.STRING,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'MasterSatuanId'),
    ])
  },
}
