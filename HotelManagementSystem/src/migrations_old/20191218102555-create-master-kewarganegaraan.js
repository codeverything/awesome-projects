import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'MasterKewarganegaraans',
  (DataTypes) => {
    return {
      nama: {
        type: DataTypes.STRING,
      },
    }
  }
)
