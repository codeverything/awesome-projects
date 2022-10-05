const tableName = 'Promos'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      nama: {
        type: Sequelize.STRING,
      },
      kuota: {
        type: Sequelize.INTEGER,
      },
      tanggalMulai: {
        type: Sequelize.DATE,
      },
      tanggalSelesai: {
        type: Sequelize.DATE,
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName)
  },
}
