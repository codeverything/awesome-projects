// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'ApiRoutes'
export interface ApiRouteAttributes {
  id: string
  url: string
  method: string
  title: string
  functionName: string
  deletedAt: Date
  createdAt?: Date
  updatedAt?: Date
}

interface ApiRouteCreationAttributes
  extends Optional<ApiRouteAttributes, 'id'> {}

interface ApiRouteInstance
  extends Model<ApiRouteAttributes, ApiRouteCreationAttributes>,
    ApiRouteAttributes {}

const ApiRoute = db.sequelize.define<ApiRouteInstance>(tableName, {
  ...SequelizeAttributes.old.ApiRoutes,
})

export default ApiRoute
