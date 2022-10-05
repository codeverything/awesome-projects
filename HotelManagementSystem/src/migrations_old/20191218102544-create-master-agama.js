import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable('MasterAgamas', (DataTypes) => {
  return {
    nama: {
      type: DataTypes.STRING,
    },
  }
})
