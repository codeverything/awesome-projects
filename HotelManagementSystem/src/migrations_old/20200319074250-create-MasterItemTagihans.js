import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'MasterItemTagihans',
  (DataTypes) => {
    return {
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      satuan: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    }
  }
)
