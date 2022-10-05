// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterStatusCheckKamars'
export interface MasterStatusCheckKamarAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterStatusCheckKamarCreationAttributes
  extends Optional<MasterStatusCheckKamarAttributes, 'id'> {}

interface MasterStatusCheckKamarInstance
  extends Model<
      MasterStatusCheckKamarAttributes,
      MasterStatusCheckKamarCreationAttributes
    >,
    MasterStatusCheckKamarAttributes {}

const MasterStatusCheckKamar = db.sequelize.define<
  MasterStatusCheckKamarInstance
>(tableName, {
  ...SequelizeAttributes.old.MasterStatusCheckKamars,
})

export default MasterStatusCheckKamar
