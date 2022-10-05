module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LogLinenLaundries', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      LinenId: {
        type: Sequelize.UUID,
      },
      VendorLaundryId: {
        type: Sequelize.UUID,
      },
      keluarKotor: {
        type: Sequelize.INTEGER,
      },
      masukBersih: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('LogLinenLaundries')
  },
}
