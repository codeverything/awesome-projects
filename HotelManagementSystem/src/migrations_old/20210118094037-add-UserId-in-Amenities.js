const tableName = 'AmenitySupplies'
const tableName2 = 'LostAndFounds'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(tableName, 'UserId', {
        type: Sequelize.UUID,
      }),
      queryInterface.addColumn(tableName2, 'UserId', {
        type: Sequelize.UUID,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(tableName, 'UserId'),
      queryInterface.removeColumn(tableName2, 'UserId'),
    ])
  },
}
