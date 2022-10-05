module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ReservasiKamarInvoiceTagihans', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      ReservasiKamarId: {
        type: Sequelize.UUID,
      },
      InvoiceTagihanId: {
        type: Sequelize.UUID,
      },
      nominal: {
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
    await queryInterface.dropTable('ReservasiKamarInvoiceTagihans')
  },
}
