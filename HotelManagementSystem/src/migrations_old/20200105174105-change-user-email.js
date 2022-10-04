import { DataTypes } from 'sequelize'

const tableName = 'Users'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(tableName, 'email', {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(tableName, 'email', {
        type: Sequelize.STRING,
      }),
    ])
  },
}
