import SequeliceMigration from 'utils/SequeliceMigration'

module.exports = SequeliceMigration.createTable(
  'RoutePermissions',
  (DataTypes) => {
    return {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ApiRouteId: {
        type: DataTypes.INTEGER,
      },
      RoleId: {
        type: DataTypes.UUID,
      },
      filtered: {
        type: DataTypes.TEXT,
      },
      sorted: {
        type: DataTypes.TEXT,
      },
    }
  }
)
