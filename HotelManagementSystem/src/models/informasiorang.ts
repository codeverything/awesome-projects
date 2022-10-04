// eslint-disable-next-line no-unused-vars
import models from 'models'
import { Model, Optional } from 'sequelize'
import { ImageUpload } from 'helpers/baseInterface'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { CityAttributes } from './city'
import { MasterJenisKelaminAttributes } from './masterjeniskelamin'
import { MasterStatusPerkawinanAttributes } from './masterstatusperkawinan'
import { MasterKewarganegaraanAttributes } from './masterKewarganegaraan'
import { MasterTipeTamuAttributes } from './mastertipetamu'
import { PerusahaanAttributes } from './perusahaan'

import db from './_instance'

const tableName = 'InformasiOrangs'
export interface InformasiOrangAttributes {
  Perusahaan: PerusahaanAttributes
  id: string
  nama?: string
  MasterTipeIdentitasId?: string
  nomorIdentitas?: string
  CityId?: number
  tanggalLahir?: Date
  alamat?: string
  MasterJenisKelaminId?: string
  email?: string | undefined
  nomorHandphone?: string
  MasterStatusPerkawinanId?: string
  MasterAgamaId?: string
  MasterKewarganegaraanId?: string
  pekerjaan?: string
  fileIdentitas?: string | ImageUpload
  fileBuktiMenikah?: string
  MasterTipeTamuId?: string
  MasterTipeTamu: MasterTipeTamuAttributes
  jabatan?: string
  City: CityAttributes
  MasterJenisKelamin: MasterJenisKelaminAttributes
  MasterStatusPerkawinan: MasterStatusPerkawinanAttributes
  MasterKewarganegaraan: MasterKewarganegaraanAttributes
  dataValues: any

  PerusahaanId: string
  createdAt?: Date
  deletedAt?: Date
  updatedAt?: Date
}

interface InformasiOrangCreationAttributes
  extends Optional<InformasiOrangAttributes, 'id'> {}

interface InformasiOrangInstance
  extends Model<InformasiOrangAttributes, InformasiOrangCreationAttributes>,
    InformasiOrangAttributes {}

const InformasiOrang = db.sequelize.define<InformasiOrangInstance>(
  tableName,
  {
    ...SequelizeAttributes.old.InformasiOrangs,
  },
  {
    paranoid: true,
  }
)
InformasiOrang.associate = (models) => {
  InformasiOrang.belongsTo(models.MasterTipeTamu)
  InformasiOrang.belongsTo(models.MasterTipeIdentitas, {
    foreignKey: 'MasterTipeIdentitasId',
  })
  InformasiOrang.belongsTo(models.MasterJenisKelamin)
  InformasiOrang.belongsTo(models.MasterAgama)
  InformasiOrang.belongsTo(models.MasterStatusPerkawinan)
  InformasiOrang.belongsTo(models.MasterKewarganegaraan)
  InformasiOrang.belongsTo(models.City)
  InformasiOrang.belongsTo(models.Perusahaan)
}

export default InformasiOrang
