// eslint-disable-next-line no-unused-vars
import { DataTypes, Model, Optional } from 'sequelize'
import constMasterStatusCheckKamar from 'constants/ConstStatusCheckKamar'
import constMasterSatuan from 'constants/ConstMasterSatuan'
import { KamarAttributes } from 'models/kamar'
import { SpesifikasiKamarAttributes } from 'models/spesifikasikamar'
import { ReservasiFasilitasTambahanAttributes } from 'models/reservasifasilitastambahan'
import { LogLostAndFoundAttributes } from 'models/loglostandfound'
import { MasterStatusLostAndFoundsAttributes } from 'models/masterstatuslostandfound'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import db from './_instance'
import { MasterFasilitasTambahanAttributes } from './masterfasilitastambahan'

const tableName = 'ReservasiKamars'
export interface ReservasiKamarAttributes {
  id: string
  KamarId?: string
  tanggalCheckIn?: Date
  tanggalCheckOut?: Date | any
  MasterTipePromoId?: string
  nilaiPromo?: number
  MasterTipeKamarId?: string
  MasterTipeKasurId?: string
  MasterSpecialRequirementId?: string
  SpesifikasiKamarId?: string
  keterangan?: string
  ReservasiId?: string | any
  isExtend?: boolean
  isChecked?: boolean
  buttonExtend?: boolean
  hargaOTA?: number
  MasterStatusKamarId?: string
  MasterStatusCheckKamarId?: string
  MasterSatuanId?: string
  MasterStatusLostAndFoundId?: string
  FasilitasTambahans: MasterFasilitasTambahanAttributes
  Kamar?: KamarAttributes
  ReservasiFasilitasTambahans?: ReservasiFasilitasTambahanAttributes
  SpesifikasiKamar?: SpesifikasiKamarAttributes
  tanggalDiambil?: Date
  diambilOleh?: string
  atasNama?: string
  isSwap?: boolean
  deletedAt: Date
  createdAt?: Date
  updatedAt?: Date
}

interface ReservasiKamarCreationAttributes
  extends Optional<ReservasiKamarAttributes, 'id'> {}

interface ReservasiKamarInstance
  extends Model<ReservasiKamarAttributes, ReservasiKamarCreationAttributes>,
    ReservasiKamarAttributes {
  dataValues: any
  LogLostAndFounds: LogLostAndFoundAttributes[]
  MasterStatusLostAndFound: MasterStatusLostAndFoundsAttributes
}

const ReservasiKamar = db.sequelize.define<ReservasiKamarInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.ReservasiKamars,
    isExtend: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isChecked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isSwap: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    buttonExtend: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    MasterStatusCheckKamarId: {
      type: DataTypes.UUID,
      defaultValue: constMasterStatusCheckKamar.CHECK,
    },
    MasterSatuanId: {
      type: DataTypes.UUID,
      defaultValue: constMasterSatuan.MALAM,
    },
  },
  {
    paranoid: true,
  }
)

ReservasiKamar.associate = (models) => {
  ReservasiKamar.belongsTo(models.Kamar)
  ReservasiKamar.belongsTo(models.SpesifikasiKamar)
  ReservasiKamar.belongsTo(models.MasterTipePromo)
  ReservasiKamar.belongsTo(models.Reservasi, { foreignKey: 'ReservasiId' })
  ReservasiKamar.belongsTo(models.MasterTipeKamar)
  ReservasiKamar.belongsTo(models.MasterTipeKasur)
  ReservasiKamar.belongsTo(models.MasterSpecialRequirement)
  ReservasiKamar.hasMany(models.ReservasiFasilitasTambahan)
  ReservasiKamar.belongsTo(models.MasterStatusKamar)
  ReservasiKamar.belongsTo(models.MasterStatusCheckKamar)
  ReservasiKamar.belongsTo(models.MasterSatuan)
  ReservasiKamar.belongsTo(models.MasterStatusLostAndFound)
  ReservasiKamar.belongsToMany(models.ItemKamar, {
    through: {
      model: models.ReservasiKamarItemKamar,
    },
  })
  ReservasiKamar.hasOne(models.InvoiceTagihan)
  ReservasiKamar.hasMany(models.LogLostAndFound)
}

export default ReservasiKamar
