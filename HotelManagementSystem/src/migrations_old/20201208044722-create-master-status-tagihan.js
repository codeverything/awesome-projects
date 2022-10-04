import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'MasterStatusTagihans',
  (DataTypes) => {
    return {
      nama: {
        type: DataTypes.STRING,
      },
    }
  }
)
