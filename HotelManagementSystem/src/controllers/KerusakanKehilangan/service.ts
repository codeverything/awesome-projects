/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import models from 'models'
// import schema from './schema'

const { ReservasiKamarItemKamar } = models

class KerusakanKehilanganService {
  public static async create(id: string, formData: any) {
    const listData: any[] = []
    for (const item in formData.itemKamar) {
      const data = await ReservasiKamarItemKamar.create({
        ...formData.itemKamar[item],
        ReservasiKamarId: id,
      })
      listData.push(data)
    }
    return listData
  }
}

export default KerusakanKehilanganService
