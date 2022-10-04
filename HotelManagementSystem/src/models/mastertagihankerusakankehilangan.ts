// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterTagihanKerusakanKehilangans'
export interface MasterTagihanKerusakanKehilanganAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterTagihanKerusakanKehilanganCreationAttributes
  extends Optional<MasterTagihanKerusakanKehilanganAttributes, 'id'> {}

interface MasterTagihanKerusakanKehilanganInstance
  extends Model<
      MasterTagihanKerusakanKehilanganAttributes,
      MasterTagihanKerusakanKehilanganCreationAttributes
    >,
    MasterTagihanKerusakanKehilanganAttributes {}

const MasterTagihanKerusakanKehilangan = db.sequelize.define<
  MasterTagihanKerusakanKehilanganInstance
>(tableName, {
  ...SequelizeAttributes.old.MasterTagihanKerusakanKehilangans,
})

export default MasterTagihanKerusakanKehilangan
