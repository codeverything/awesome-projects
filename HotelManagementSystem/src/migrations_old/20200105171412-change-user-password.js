import { DataTypes } from 'sequelize'

const tableName = 'Users'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(tableName, 'password', {
        type: DataTypes.STRING,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(tableName, 'password', {
        type: Sequelize.STRING,
      }),
    ])
  },
}
