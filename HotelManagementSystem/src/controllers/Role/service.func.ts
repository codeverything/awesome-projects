/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { UserAttributes } from 'models/user'
import { filter, find, map } from 'lodash'

import { Request } from 'express'
import Utilities from './utilities'

class RoleService {
  public static async getHeader(payload: UserAttributes) {
    const util = new Utilities(payload.id)
    const role: any = await util.getUserCredential()

    return util.restructuredObject(util.checked(role.hakAkses))
  }

  public static async getHeaderRoute(payload: UserAttributes, req: Request) {
    const util = new Utilities(payload.id)
    const role: any = await util.getUserCredential()
    const { filtered } = req.getQuery()
    const filterObject = filtered ? JSON.parse(req.query.filtered as any) : []
    let data: any = filter(role.hakAkses, (x) => x.checked)
    const findIsFilter = find(filterObject, (x) => x.id === 'isFilteredShow')
    if (findIsFilter) {
      for (const item in filterObject) {
        if (filterObject[item].id === 'headerId') {
          data = find(data, (x) => x.id === filterObject[item].value)
          const dataFilter = util.checked(data.listRoute)
          data = map(dataFilter, (x) => {
            return {
              headerRouteId: x.id,
              nama: x.nama,
              path: x.path,
              checked: x.checked,
              listRoute: map(x.listRoute, (x) => {
                return {
                  subRouteId: x.id,
                  nama: x.nama,
                  path: x.path,
                  checked: x.checked,
                  listRoute: map(x.listRoute, (x) => {
                    return {
                      detailSubRouteId: x.id,
                      nama: x.nama,
                      path: x.path,
                      checked: x.checked,
                      listRoute: x.listRoute,
                    }
                  }),
                }
              }),
            }
          })
        }
        if (filterObject[item].id === 'headerRouteId') {
          data = util.getRoute(data, 'headerRouteId', filterObject[item].value)
            .listRoute
        }
        data = util.checked(data)

        if (filterObject[item].id === 'subRouteId') {
          data = util.getRoute(data, 'subRouteId', filterObject[item].value)
            .listRoute
        }
        data = util.checked(data)
        if (filterObject[item].id === 'detailSubRouteId') {
          data = util.getRoute(
            data,
            'detailSubRouteId',
            filterObject[item].value
          ).listRoute
          data = util.checked(data)
        }
      }
    } else {
      for (const item in filterObject) {
        if (filterObject[item].id === 'headerId') {
          data = find(data, (x) => x.id === filterObject[item].value)
          data = map(data.listRoute, (x) => {
            return {
              headerRouteId: x.id,
              nama: x.nama,
              path: x.path,
              checked: x.checked,
              listRoute: map(x.listRoute, (x) => {
                return {
                  subRouteId: x.id,
                  nama: x.nama,
                  path: x.path,
                  checked: x.checked,
                  listRoute: map(x.listRoute, (x) => {
                    return {
                      detailSubRouteId: x.id,
                      nama: x.nama,
                      path: x.path,
                      checked: x.checked,
                      listRoute: x.listRoute,
                    }
                  }),
                }
              }),
            }
          })
        }
        if (filterObject[item].id === 'headerRouteId') {
          data = util.getRoute(data, 'headerRouteId', filterObject[item].value)
            .listRoute
        }

        if (filterObject[item].id === 'subRouteId') {
          data = util.getRoute(data, 'subRouteId', filterObject[item].value)
            .listRoute
        }
        if (filterObject[item].id === 'detailSubRouteId') {
          data = util.getRoute(
            data,
            'detailSubRouteId',
            filterObject[item].value
          ).listRoute
        }
      }
    }
    return data
  }
}

export default RoleService
