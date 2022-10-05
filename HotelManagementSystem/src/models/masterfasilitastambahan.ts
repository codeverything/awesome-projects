// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { JenisFasilitasTambahanAttributes } from './jenisfasilitastambahan'
import { LogHargaMasterFasilitasTambahanAttributes } from './loghargamasterfasilitastambahan'
import { MasterSatuanAttributes } from './mastersatuan'

import db from './_instance'

const tableName = 'MasterFasilitasTambahans'

export interface MasterFasilitasTambahanAttributes {
  id: string
  MasterSourcePemesananId: string
  JenisFasilitasTambahanId: string
  MasterSatuanId?: string | any
  createdAt?: Date | any
  updatedAt?: Date
}

interface MasterFasilitasTambahanCreationAttributes
  extends Optional<MasterFasilitasTambahanAttributes, 'id'> {}

interface MasterFasilitasTambahanInstance
  extends Model<
      MasterFasilitasTambahanAttributes,
      MasterFasilitasTambahanCreationAttributes
    >,
    MasterFasilitasTambahanAttributes {
  MasterSatuan: MasterSatuanAttributes
  JenisFasilitasTambahan: JenisFasilitasTambahanAttributes
  LogHargaMasterFasilitasTambahan: LogHargaMasterFasilitasTambahanAttributes
}

const MasterFasilitasTambahan = db.sequelize.define<
  MasterFasilitasTambahanInstance
>(tableName, {
  ...SequelizeAttributes.old.MasterFasilitasTambahans,
})

MasterFasilitasTambahan.associate = (models) => {
  MasterFasilitasTambahan.hasOne(models.LogHargaMasterFasilitasTambahan)
  MasterFasilitasTambahan.belongsTo(models.MasterSourcePemesanan)
  MasterFasilitasTambahan.belongsTo(models.JenisFasilitasTambahan)
  MasterFasilitasTambahan.belongsTo(models.MasterSatuan)
}

export default MasterFasilitasTambahan
