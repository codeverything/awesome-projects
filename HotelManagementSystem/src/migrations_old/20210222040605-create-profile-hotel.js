module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ProfileHotels', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      profileHotelPath: {
        type: Sequelize.STRING,
      },
      nama: {
        type: Sequelize.STRING,
      },
      nomorTelepon: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      alamat: {
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
    await queryInterface.dropTable('ProfileHotels')
  },
}
