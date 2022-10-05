/* eslint-disable import/no-cycle */
// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import ResponseError from 'modules/Response/ResponseError'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { MasterTipeKamarAttributes } from './mastertipekamar'
import { MasterTipeKasurAttributes } from './mastertipekasur'
import { MasterSpecialRequirementAttributes } from './masterspecialrequirement'
import { ItemKamarAttributes } from './itemkamar'
import { LinenAttributes } from './linen'
import { HargaSpesifikasiKamarAttributes } from './hargaspesifikasikamar'
import { LogHargaDefaultSpesifikasiKamarAttributes } from './loghargadefaultspesifikasikamar'

import db from './_instance'

const tableName = 'SpesifikasiKamars'

export interface SpesifikasiKamarAttributes {
  id: string
  nama: string
  MasterTipeKamarId: string
  MasterTipeKasurId: string
  MasterSpecialRequirementId: string
  maxTamu: number
  MasterTipeKamar?: MasterTipeKamarAttributes | any
  MasterTipeKasur?: MasterTipeKasurAttributes | any
  MasterSpecialRequirement?: MasterSpecialRequirementAttributes | any
  Linens?: LinenAttributes[]
  ItemKamars?: ItemKamarAttributes[]
  HargaSpesifikasiKamar?: HargaSpesifikasiKamarAttributes
  LogHargaDefaultSpesifikasiKamar?: LogHargaDefaultSpesifikasiKamarAttributes
  createdAt?: Date
  updatedAt?: Date
}

interface SpesifikasiKamarCreationAttributes
  extends Optional<SpesifikasiKamarAttributes, 'id'> {}

interface SpesifikasiKamarInstance
  extends Model<SpesifikasiKamarAttributes, SpesifikasiKamarCreationAttributes>,
    SpesifikasiKamarAttributes {}

const SpesifikasiKamar = db.sequelize.define<SpesifikasiKamarInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.SpesifikasiKamars,
  }
)

SpesifikasiKamar.associate = (models) => {
  SpesifikasiKamar.hasOne(models.HargaSpesifikasiKamar, {
    foreignKey: 'SpesifikasiKamarId',
  })
  SpesifikasiKamar.hasOne(models.LogHargaDefaultSpesifikasiKamar)
  SpesifikasiKamar.belongsTo(models.MasterTipeKamar)
  SpesifikasiKamar.belongsTo(models.MasterTipeKasur)
  SpesifikasiKamar.hasMany(models.Kamar)
  SpesifikasiKamar.belongsTo(models.MasterSpecialRequirement)
  SpesifikasiKamar.belongsToMany(models.Linen, {
    through: models.SpesifikasiKamarLinen,
  })
  SpesifikasiKamar.belongsToMany(models.ItemKamar, {
    through: models.SpesifikasiKamarItem,
  })
}

SpesifikasiKamar.beforeCreate(async (instance: SpesifikasiKamarAttributes) => {
  const {
    MasterTipeKamarId,
    MasterTipeKasurId,
    MasterSpecialRequirementId,
  } = instance
  const isSpesifikasiKamarExist = await SpesifikasiKamar.findOne({
    where: {
      MasterTipeKamarId,
      MasterTipeKasurId,
      MasterSpecialRequirementId,
    },
  })
  if (isSpesifikasiKamarExist) {
    throw new ResponseError.BadRequest('Spesifikasi Kamar Sudah Tersedia')
  }
})

export default SpesifikasiKamar
