import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable('Shifts', (DataTypes) => {
  return {
    nama: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    waktuMulai: {
      allowNull: false,
      type: DataTypes.TIME,
    },
    waktuSelesai: {
      allowNull: false,
      type: DataTypes.TIME,
    },
  }
})
