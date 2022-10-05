const tableName = 'LogLostAndFounds'
const tableName2 = 'LostAndFounds'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'InformasiOrangId', {
        type: Sequelize.UUID,
      }),
      queryInterface.addColumn(tableName2, 'InformasiOrangId', {
        type: Sequelize.STRING,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'InformasiOrangId'),
      queryInterface.removeColumn(tableName2, 'InformasiOrangId'),
    ])
  },
}
