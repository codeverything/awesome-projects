import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'MasterTipePembayarans',
  (DataTypes) => {
    return {
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    }
  }
)
