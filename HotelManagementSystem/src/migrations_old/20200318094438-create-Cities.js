import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable('Cities', (DataTypes) => {
  return {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nama: {
      type: DataTypes.STRING,
    },
    latitude: { type: DataTypes.STRING },
    longitude: { type: DataTypes.STRING },
    geojson: { type: DataTypes.TEXT },
    zoom: { type: DataTypes.STRING },
    ProvinsiId: { type: DataTypes.INTEGER },
  }
})
