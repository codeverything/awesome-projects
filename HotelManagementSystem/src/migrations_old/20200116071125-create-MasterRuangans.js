import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'MasterRuangans',
  (DataTypes) => {
    return {
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    }
  }
)
