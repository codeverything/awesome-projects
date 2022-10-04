const moment = require('moment')

exports.createSeedData = (
  tableName,
  listData,
  arrColumnsDate = ['createdAt', 'updatedAt']
) => {
  return {
    up: (queryInterface, Sequelize) => {
      const data = listData.map((x) => {
        const item = { ...x }
        for (let i = 0; i < arrColumnsDate.length; i += 1) {
          const columnDate = arrColumnsDate[i]
          item[columnDate] = moment(item[columnDate] || 0).toDate()
        }

        return item
      })
      return queryInterface.bulkInsert(tableName, data, {
        updateOnDuplicate: Object.keys(data[0]),
      })
    },

    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete(
        tableName,
        {
          id: listData.map((x) => x[Object.keys(x)[0]]),
        },
        {}
      )
    },
  }
}
