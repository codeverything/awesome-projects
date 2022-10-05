import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'MasterSpecialRequirements',
  (DataTypes) => {
    return {
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    }
  }
)
