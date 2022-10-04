import SequeliceMigration from 'utils/SequeliceMigration'

const tableName = 'Shifts'
const cols = (DataTypes) => {
  return [
    { key: 'waktuSelesai', type: DataTypes.TIME },
    { key: 'waktuMulai', type: DataTypes.TIME },
  ]
}

module.exports = SequeliceMigration.removeColumns(tableName, cols)
