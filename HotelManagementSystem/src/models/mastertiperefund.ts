// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterTipeRefunds'
export interface MasterTipeRefundAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterTipeRefundCreationAttributes
  extends Optional<MasterTipeRefundAttributes, 'id'> {}

interface MasterTipeRefundInstance
  extends Model<MasterTipeRefundAttributes, MasterTipeRefundCreationAttributes>,
    MasterTipeRefundAttributes {}

const MasterTipeRefund = db.sequelize.define<MasterTipeRefundInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.MasterTipeRefunds,
  }
)

export default MasterTipeRefund
