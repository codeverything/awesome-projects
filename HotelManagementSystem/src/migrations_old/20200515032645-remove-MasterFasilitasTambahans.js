const tableName = 'MasterFasilitasTambahans'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([queryInterface.removeColumn(tableName, 'nama')])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'nama', {
        type: Sequelize.STRING,
      }),
    ])
  },
}
