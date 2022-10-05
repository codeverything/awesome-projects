// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'RoutePermissions'
export interface RoutePermissionAttributes {
  id: string
  ApiRouteId: number
  RoleId: string
  filtered: string
  sorted: string
  filterBodyKeys: string
  assignBodyKeys: string
  createdAt?: Date
  updatedAt?: Date
}

interface RoutePermissionCreationAttributes
  extends Optional<RoutePermissionAttributes, 'id'> {}

interface RoutePermissionInstance
  extends Model<RoutePermissionAttributes, RoutePermissionCreationAttributes>,
    RoutePermissionAttributes {}

const RoutePermission = db.sequelize.define<RoutePermissionInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.RoutePermissions,
  }
)

export default RoutePermission
