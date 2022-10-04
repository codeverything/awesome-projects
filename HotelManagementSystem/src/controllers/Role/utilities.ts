/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import { map, find, filter } from 'lodash'
import models from 'models'

export default class Utilities {
  readonly payload: string

  constructor(payload: string) {
    this.payload = payload
  }

  restructuredObject(value: any, objectName: string = 'id') {
    return map(value, (x) => {
      return {
        [objectName]: x.id,
        nama: x.nama,
        path: x.path,
        checked: x.checked,
      }
    })
  }

  async getUserCredential() {
    const user = await models.User.findByPk(this.payload)
    return models.Role.findOne({
      where: {
        id: user?.RoleId,
      },
    })
  }

  getRoute(data: any, column: string, value: string) {
    return find(data, (x) => x[column] === value)
  }

  checked(data: any) {
    return filter(data, (x) => x.checked)
  }
}
