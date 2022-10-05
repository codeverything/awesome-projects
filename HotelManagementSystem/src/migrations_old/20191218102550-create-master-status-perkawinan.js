import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'MasterStatusPerkawinans',
  (DataTypes) => {
    return {
      nama: {
        type: DataTypes.STRING,
      },
    }
  }
)
