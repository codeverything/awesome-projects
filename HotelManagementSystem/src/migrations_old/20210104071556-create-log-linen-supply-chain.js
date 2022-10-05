const tableName = 'LogLinenSupplyChains'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      namaStaff: {
        type: Sequelize.STRING,
      },
      masukBersih: {
        type: Sequelize.INTEGER,
      },
      masukKotor: {
        type: Sequelize.INTEGER,
      },
      hilangAwal: {
        type: Sequelize.INTEGER,
      },
      rusakAwal: {
        type: Sequelize.INTEGER,
      },
      hilangAkhir: {
        type: Sequelize.INTEGER,
      },
      rusakAkhir: {
        type: Sequelize.INTEGER,
      },
      KamarId: {
        type: Sequelize.UUID,
      },
      LinenId: {
        type: Sequelize.UUID,
      },
      ReservasiKamarId: {
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
