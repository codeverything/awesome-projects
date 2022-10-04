const sequelize = require('sequelize')
const { MockQueryInterface, read } = require('utils/ReaderMigrationSequelize')

const newMockQueryInterface = new MockQueryInterface()
const oldMockQueryInterface = new MockQueryInterface()

read(sequelize, newMockQueryInterface, 'src/migrations')
read(sequelize, oldMockQueryInterface, 'src/migrations_old')

const SequelizeAttributes = {
  old: oldMockQueryInterface.attributeTables,
  current: newMockQueryInterface.attributeTables,
}
export default SequelizeAttributes
