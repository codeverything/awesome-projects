const tableName = 'LinenSupplyChains'
const tableName2 = 'LogLinenSupplyChains'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn(tableName, 'masukKotor', 'keluarKotor'),
      queryInterface.renameColumn(tableName2, 'masukKotor', 'keluarKotor'),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn(tableName, 'keluarKotor', 'masukKotor'),
      queryInterface.renameColumn(tableName2, 'keluarKotor', 'masukKotor'),
    ])
  },
}
