import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'MasterTipePromos',
  (DataTypes) => {
    return {
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    }
  }
)
