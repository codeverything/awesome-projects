const tableName = 'LogHargaEarlyLateCharges'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'mulaiLateCheckOut', {
        type: Sequelize.TIME,
      }),
      queryInterface.addColumn(tableName, 'mulaiLateCheckOutFullDay', {
        type: Sequelize.TIME,
      }),
      queryInterface.addColumn(tableName, 'batasAkhirCheckIn', {
        type: Sequelize.TIME,
      }),
      queryInterface.addColumn(tableName, 'batasAkhirCheckInFullDay', {
        type: Sequelize.TIME,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'mulaiLateCheckOut'),
      queryInterface.removeColumn(tableName, 'mulaiLateCheckOutFullDay'),
      queryInterface.removeColumn(tableName, 'batasAkhirCheckIn'),
      queryInterface.removeColumn(tableName, 'batasAkhirCheckInFullDay'),
    ])
  },
}
