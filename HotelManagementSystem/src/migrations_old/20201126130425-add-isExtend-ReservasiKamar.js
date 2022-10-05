const tableName = 'ReservasiKamars'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'isExtend', {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn(tableName, 'isChecked', {
        type: Sequelize.BOOLEAN,
      }),
      queryInterface.addColumn(tableName, 'MasterStatusKamarId', {
        type: Sequelize.UUID,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'isExtend'),
      queryInterface.removeColumn(tableName, 'isChecked'),
      queryInterface.removeColumn(tableName, 'MasterStatusKamarId'),
    ])
  },
}
