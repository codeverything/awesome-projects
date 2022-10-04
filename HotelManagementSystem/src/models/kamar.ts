// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import models from 'models'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { MasterStatusHKAttributes } from './masterstatushk'
import { SpesifikasiKamarAttributes } from './spesifikasikamar'
import { MasterStatusKamarAttributes } from './masterstatuskamar'
import { ConnectingDoorAttributes } from './connectingdoor'

import db from './_instance'

const tableName = 'Kamars'

export interface KamarAttributes {
  id: string | any | any[]
  nomor?: string
  SpesifikasiKamarId?: string
  MasterStatusHKId?: string | any
  MasterStatusKamarId?: string
  keterangan?: string
  MasterStatusHK?: MasterStatusHKAttributes
  SpesifikasiKamar?: SpesifikasiKamarAttributes
  MasterStatusKamar?: MasterStatusKamarAttributes
  ConnectingDoors?: ConnectingDoorAttributes[]
  lastUpdate?: Date
  createdAt?: Date
  updatedAt?: Date | any
}

interface KamarCreationAttributes extends Optional<KamarAttributes, 'id'> {}

interface KamarInstance
  extends Model<KamarAttributes, KamarCreationAttributes>,
    KamarAttributes {
  dataValues?: any
}

const Kamar = db.sequelize.define<KamarInstance>(tableName, {
  ...SequelizeAttributes.old.Kamars,
})

Kamar.associate = function (models) {
  // associations can be defined here
  Kamar.hasMany(models.ReservasiKamar)
  Kamar.belongsTo(models.SpesifikasiKamar)
  Kamar.belongsTo(models.MasterStatusHK)
  Kamar.belongsTo(models.MasterStatusKamar)
  Kamar.hasMany(models.ConnectingDoor, { foreignKey: 'KamarId' })
}

Kamar.beforeDestroy(async (instance) => {
  const connectingDoor = await models.ConnectingDoor.findOne({
    where: { KamarId: instance.id },
  })
  const kamarConnect = await Kamar.findByPk(connectingDoor?.KamarConnectId)
  await kamarConnect?.update({ keterangan: null })
  await models.ConnectingDoor.destroy({ where: { KamarId: instance.id } })
})
export default Kamar
