import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable('ApiRoutes', (DataTypes) => {
  return {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    url: {
      type: DataTypes.STRING,
    },
    method: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    functionName: {
      type: DataTypes.STRING,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  }
})
