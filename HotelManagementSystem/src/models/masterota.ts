// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterOTAs'
export interface MasterOTAAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterOTACreationAttributes
  extends Optional<MasterOTAAttributes, 'id'> {}

interface MasterOTAInstance
  extends Model<MasterOTAAttributes, MasterOTACreationAttributes>,
    MasterOTAAttributes {}

const MasterOTA = db.sequelize.define<MasterOTAInstance>(tableName, {
  ...SequelizeAttributes.old.MasterOTAs,
})

export default MasterOTA
