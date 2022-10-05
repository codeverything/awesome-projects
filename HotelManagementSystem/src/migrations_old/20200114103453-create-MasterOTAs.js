import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable('MasterOTAs', (DataTypes) => {
  return {
    nama: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }
})
