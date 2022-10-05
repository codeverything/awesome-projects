// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

export interface RoleHakAksesAttributes {
  id: string
  RoleId: string | any
  HakAksesId: string | any
  createdAt?: Date
  updatedAt?: Date
}

interface RoleHakAksesCreationAttributes
  extends Optional<RoleHakAksesAttributes, 'id'> {}

interface RoleHakAksesInstance
  extends Model<RoleHakAksesAttributes, RoleHakAksesCreationAttributes>,
    RoleHakAksesAttributes {}

const RoleHakAkses = db.sequelize.define<RoleHakAksesInstance>('RoleHakAkses', {
  ...SequelizeAttributes.old.RoleHakAkses,
})

export default RoleHakAkses
