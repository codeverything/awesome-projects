import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable('Roles', (DataTypes) => {
  return {
    nama: {
      type: DataTypes.STRING,
    },
  }
})
