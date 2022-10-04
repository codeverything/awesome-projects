import SequeliceMigration from 'utils/SequeliceMigration'

const tableName = 'RoutePermissions'
const newColumns = (DataTypes) => {
  return [{ key: 'injectBodyKeys', type: DataTypes.TEXT }]
}

module.exports = SequeliceMigration.addColumns(tableName, newColumns)
