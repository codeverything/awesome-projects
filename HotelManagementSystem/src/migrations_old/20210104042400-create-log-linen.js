const tableName = 'LogLinens'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      LinenId: {
        type: Sequelize.UUID,
      },
      activity: {
        type: Sequelize.STRING,
      },
      namaStaff: {
        type: Sequelize.STRING,
      },
      jumlah: {
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(tableName)
  },
}
