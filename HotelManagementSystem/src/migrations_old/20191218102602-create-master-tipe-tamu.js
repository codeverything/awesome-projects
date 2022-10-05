import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'MasterTipeTamus',
  (DataTypes) => {
    return {
      nama: {
        type: DataTypes.STRING,
      },
    }
  }
)
