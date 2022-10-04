module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ReservasiKamarItemKamars', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      ReservasiKamarId: {
        type: Sequelize.UUID,
      },
      LinenId: {
        type: Sequelize.STRING,
      },
      ItemKamarId: {
        type: Sequelize.STRING,
      },
      KamarId: {
        type: Sequelize.UUID,
      },
      jumlah: {
        type: Sequelize.INTEGER,
      },
      MasterStatusTagihanId: {
        type: Sequelize.UUID,
      },
      MasterTagihanKerusakanKehilanganId: {
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
    await queryInterface.dropTable('ReservasiKamarItemKamars')
  },
}
