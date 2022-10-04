// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'LogHargaMasterFasilitasTambahans'

export interface LogHargaMasterFasilitasTambahanAttributes {
  id: string
  MasterFasilitasTambahanId: string
  harga: number
  createdAt?: Date
  updatedAt?: Date
}

interface LogHargaMasterFasilitasTambahanCreationAttributes
  extends Optional<LogHargaMasterFasilitasTambahanAttributes, 'id'> {}

interface LogHargaMasterFasilitasTambahanInstance
  extends Model<
      LogHargaMasterFasilitasTambahanAttributes,
      LogHargaMasterFasilitasTambahanCreationAttributes
    >,
    LogHargaMasterFasilitasTambahanAttributes {}

const LogHargaMasterFasilitasTambahan = db.sequelize.define<
  LogHargaMasterFasilitasTambahanInstance
>(tableName, {
  ...SequelizeAttributes.old.LogHargaMasterFasilitasTambahans,
})

export default LogHargaMasterFasilitasTambahan
