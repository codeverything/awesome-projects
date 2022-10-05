module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HakAkses', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      nama: {
        type: Sequelize.STRING,
      },
      hakAkses: {
        type: Sequelize.JSON,
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
    await queryInterface.dropTable('HakAkses')
  },
}
