import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable('Perusahaans', (DataTypes) => {
  return {
    nama: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    alamat: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    nomorHandphone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }
})
