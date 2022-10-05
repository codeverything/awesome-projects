const tableName = 'LogAmenitities'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn(tableName, 'nama', 'namaStaff'),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn(tableName, 'namaStaff', 'nama'),
    ])
  },
}
