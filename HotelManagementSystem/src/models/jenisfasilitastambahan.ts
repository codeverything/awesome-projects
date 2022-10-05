// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'JenisFasilitasTambahans'

export interface JenisFasilitasTambahanAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface JenisFasilitasTambahanCreationAttributes
  extends Optional<JenisFasilitasTambahanAttributes, 'id'> {}

interface JenisFasilitasTambahanInstance
  extends Model<
      JenisFasilitasTambahanAttributes,
      JenisFasilitasTambahanCreationAttributes
    >,
    JenisFasilitasTambahanAttributes {}

const JenisFasilitasTambahan = db.sequelize.define<
  JenisFasilitasTambahanInstance
>(tableName, {
  ...SequelizeAttributes.old.JenisFasilitasTambahans,
})

export default JenisFasilitasTambahan
