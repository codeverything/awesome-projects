/* eslint-disable no-loop-func */
/* eslint-disable prettier/prettier */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
import moment from 'moment'
import { durationCalc } from 'helpers/Common'

class CheckAvailable {
  check(tanggalCheckIn: Date, tanggalCheckOut: Date, data: any, spesifikasiKamarId: string) {
    const duration = durationCalc(tanggalCheckIn, tanggalCheckOut)
    const list: any[] = []
    for (let i = 0; i < duration; i++) {
      let total: number = 0
      for (let j = 0; j < data.length; j++) {
        if (
          moment(data[j].tanggalAkhirCheckOut).isBetween(
            moment(tanggalCheckIn).add(i, 'days'),
            moment(tanggalCheckOut),
            'days'
          )
        ) {
          if(moment(tanggalCheckIn).add(i, 'days').days() < moment(data[j].tanggalAwalCheckIn).days() && moment(tanggalCheckIn).add(i, 'days').isSame(data[j].tanggalAwalCheckIn) === false) {
            data[j].ReservasiKamars.forEach(x => {
              if(x.SpesifikasiKamarId === spesifikasiKamarId) {
                total += 1
              }
            })
          } else {
            data[j].ReservasiKamars.forEach(x => {
            if(x.SpesifikasiKamarId === spesifikasiKamarId) {
              total += 1
            }
          })
          }
        } else if (
          moment(tanggalCheckIn)
            .add(i, 'days')
            .isSame(moment(tanggalCheckOut).subtract(1, 'days'))  &&
          moment(data[j].tanggalAkhirCheckOut).isSame(
            moment(tanggalCheckOut),
            'days'
          ) ||
          moment(tanggalCheckIn).add(i, 'days')
            .isSame(moment(data[j].tanggalAwalCheckIn), 'days') 
        ) {
          data[j].ReservasiKamars.forEach(x => {
            if(x.SpesifikasiKamarId === spesifikasiKamarId) {
              total += 1
            }
          })
        } else if(moment(tanggalCheckIn).add(i, 'days')
        .isBetween(moment(data[j].tanggalAwalCheckIn), moment(data[j].tanggalAkhirCheckOut), 'days')) {
          data[j].ReservasiKamars.forEach(x => {
            if(x.SpesifikasiKamarId === spesifikasiKamarId) {
              total += 1
            }
          })
        }
      }
      list.push(total)
      // list.push({
      //   [moment(tanggalCheckIn)
      //     .add(i, 'days').format('YYYY-MM-DD')]: total
      // })
    }
    const sorted = list.sort((a, b) => a - b)
    const totalAvailable = sorted.length > 0 ? sorted[sorted.length - 1] : 0 
    return totalAvailable
  }
}

export default CheckAvailable
