const tableName2 = 'Perusahaans'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName2, 'InformasiOrangId', {
        type: Sequelize.UUID,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName2, 'InformasiOrangId'),
    ])
  },
}
