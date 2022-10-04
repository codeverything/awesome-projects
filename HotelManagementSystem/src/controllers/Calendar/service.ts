/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { CityAttributes } from 'models/city'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import { Op } from 'sequelize'
import moment from 'moment'
import { forIn } from 'lodash'

const { Kamar, ReservasiKamar, SpesifikasiKamar } = models

class CalendarService {
  /**
   * Get All Role
   */
  public static async getRoomReservationCalendar({ fromDate, toDate }: any) {
    const duration = Math.abs(
      moment.duration(moment(fromDate).diff(moment(toDate))).asDays()
    )
    const data: any[] = []
    for (let i = 0; i <= duration; i++) {
      const dateAwal = moment(fromDate)
        .add(i, 'day')
        .startOf('day')
        .format('YYYY-MM-DD')
      const dateAkhir = moment(toDate).endOf('day').format('YYYY-MM-DD')
      const reservasiKamar = await ReservasiKamar.findAll({
        where: {
          tanggalCheckOut: {
            [Op.between]: [dateAwal, dateAkhir],
          },
        },
      })
      const listKamarId: any = reservasiKamar.map((x) => x.KamarId)
      const daata = await SpesifikasiKamar.findAll()
      const listNamaSpesifikasi = daata.map((x) => x.nama)
      const listSpecId = daata.map((x) => x.id)
      const dataNamaSpec: any[] = []
      for (let j = 0; j < listNamaSpesifikasi.length; j++) {
        const totalKamar = await Kamar.findAll({
          where: { SpesifikasiKamarId: listSpecId[j] },
        })
        const difference: any = await Kamar.count({
          where: { SpesifikasiKamarId: listSpecId[j], id: listKamarId },
        })
        const available = totalKamar.length - difference
        const namaSpec = {
          nama: listNamaSpesifikasi[j],
          total: totalKamar.length,
          available,
          isAvailable: Boolean(available > 0),
          booked: difference,
        }
        dataNamaSpec.push(namaSpec)
      }
      data.push({
        [dateAwal]: dataNamaSpec,
      })
    }

    return data
  }
}

export default CalendarService
