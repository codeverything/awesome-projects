import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'MasterTipeKamars',
  (DataTypes) => {
    return {
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    }
  }
)
