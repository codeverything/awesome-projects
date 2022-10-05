const tableName = 'LogLostAndFounds'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      namaBarang: {
        type: Sequelize.STRING,
      },
      jumlah: {
        type: Sequelize.INTEGER,
      },
      KamarId: {
        type: Sequelize.UUID,
      },
      atasNama: {
        type: Sequelize.STRING,
      },
      tanggalCheckOut: {
        type: Sequelize.DATE,
      },
      tanggalDitemukan: {
        type: Sequelize.STRING,
      },
      noHandphone: {
        type: Sequelize.STRING,
      },
      lastUpdate: {
        type: Sequelize.STRING,
      },
      MasterStatusLostAndFoundId: {
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
