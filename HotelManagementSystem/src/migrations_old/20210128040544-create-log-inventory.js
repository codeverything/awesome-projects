module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LogInventories', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      namaInventory: {
        type: Sequelize.STRING,
      },
      MasterJenisInventoryId: {
        type: Sequelize.UUID,
      },
      MasterCategoryId: {
        type: Sequelize.UUID,
      },
      log: {
        type: Sequelize.STRING,
      },
      jumlah: {
        type: Sequelize.INTEGER,
      },
      keterangan: {
        type: Sequelize.TEXT,
      },
      penanggungJawab: {
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
    await queryInterface.dropTable('LogInventories')
  },
}
