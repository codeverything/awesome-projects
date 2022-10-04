const moment = require('moment')
const SequeliceSeed = require('../helpers/SequeliceSeed')

const data = []

// mulai dari awal tahun 2020
const initDate = new Date(2020, 0, 1)

// set mulai awal tahun 2020
let startDate = moment(initDate)
// set akhir awal tahun 2035 (15 tahun kedepan)
const endDate = moment(initDate).add(15, 'years')

let index = 1
while (startDate.isSameOrBefore(endDate, 'day')) {
  const insertData = {
    id: index,
    date: startDate.toDate(),
  }
  data.push(insertData)
  index += 1
  startDate = startDate.add(1, 'days')
}

module.exports = SequeliceSeed.createSeedData('Calendars', data)
