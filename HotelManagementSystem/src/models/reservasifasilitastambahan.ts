// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'ReservasiFasilitasTambahans'
export interface ReservasiFasilitasTambahanAttributes {
  id: string
  MasterFasilitasTambahanId: string
  jumlah: number
  ReservasiKamarId: string
  ReservasiId: string
  MasterSatuanId: string
  createdAt?: Date
  updatedAt?: Date
}

interface ReservasiFasilitasTambahanCreationAttributes
  extends Optional<ReservasiFasilitasTambahanAttributes, 'id'> {}

interface ReservasiFasilitasTambahanInstance
  extends Model<
      ReservasiFasilitasTambahanAttributes,
      ReservasiFasilitasTambahanCreationAttributes
    >,
    ReservasiFasilitasTambahanAttributes {}

const ReservasiFasilitasTambahan = db.sequelize.define<
  ReservasiFasilitasTambahanInstance
>(tableName, {
  ...SequelizeAttributes.old.ReservasiFasilitasTambahans,
})
ReservasiFasilitasTambahan.associate = (models) => {
  ReservasiFasilitasTambahan.belongsTo(models.MasterFasilitasTambahan)
  ReservasiFasilitasTambahan.belongsTo(models.MasterSatuan)
}

export default ReservasiFasilitasTambahan
