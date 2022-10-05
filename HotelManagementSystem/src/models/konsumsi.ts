// eslint-disable-next-line no-unused-vars
import models from 'models'
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'Konsumsis'

export interface KonsumsiAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface KonsumsiCreationAttributes
  extends Optional<KonsumsiAttributes, 'id'> {}

interface KonsumsiInstance
  extends Model<KonsumsiAttributes, KonsumsiCreationAttributes>,
    KonsumsiAttributes {}

const Konsumsi = db.sequelize.define<KonsumsiInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.Konsumsis,
  },
  { freezeTableName: true }
)

Konsumsi.associate = (models) => {
  Konsumsi.hasOne(models.LogHargaKonsumsi, { foreignKey: 'KonsumsiId' })
}

export default Konsumsi
