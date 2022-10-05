import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'MasterJenisKelamins',
  (DataTypes) => {
    return {
      nama: {
        type: DataTypes.STRING,
      },
    }
  }
)
