// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterKeterangans'

export interface MasterKeteranganAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterKeteranganCreationAttributes
  extends Optional<MasterKeteranganAttributes, 'id'> {}

interface MasterKeteranganInstance
  extends Model<MasterKeteranganAttributes, MasterKeteranganCreationAttributes>,
    MasterKeteranganAttributes {}

const MasterKeterangan = db.sequelize.define<MasterKeteranganInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterJenisVendorLaundries,
  }
)

export default MasterKeterangan
