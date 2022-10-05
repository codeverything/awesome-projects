module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RoleHakAkses', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      RoleId: {
        type: Sequelize.UUID,
      },
      HakAksesId: {
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
    await queryInterface.dropTable('RoleHakAkses')
  },
}
