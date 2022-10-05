// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'HakAkses'

export interface HakAksesAttributes {
  id?: string
  nama: string
  hakAkses: string
  createdAt?: Date
  updatedAt?: Date
}

interface HakAksesCreationAttributes
  extends Optional<HakAksesAttributes, 'id'> {}

interface HakAksesInstance
  extends Model<HakAksesAttributes, HakAksesCreationAttributes>,
    HakAksesAttributes {}

const HakAkses = db.sequelize.define<HakAksesInstance>(tableName, {
  ...SequelizeAttributes.old.HakAkses,
})

export default HakAkses
