module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AmenitySupplies', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      jumlah: {
        type: Sequelize.INTEGER,
      },
      AmenityId: {
        type: Sequelize.UUID,
      },
      KamarId: {
        type: Sequelize.UUID,
      },
      lastUpdate: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('AmenitySupplies')
  },
}
