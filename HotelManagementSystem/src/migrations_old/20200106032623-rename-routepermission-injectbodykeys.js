import { renameColumns } from 'utils/SequeliceMigration'

const tableName = 'RoutePermissions'
const newColumns = (Sequelize) => {
  return [{ nameBefore: 'injectBodyKeys', nameAfter: 'assignBodyKeys' }]
}

module.exports = renameColumns(tableName, newColumns)
