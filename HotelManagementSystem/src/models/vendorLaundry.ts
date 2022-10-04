// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'
import { MasterJenisVendorLaundryAttributes } from './masterjenisvendorlaundry'

import db from './_instance'

const tableName = 'VendorLaundries'

export interface VendorLaundryAttributes {
  id: string
  idVendor: string
  alamat: string
  kontak: string
  MasterJenisVendorLaundryId: string
  MasterJenisVendorLaundry: MasterJenisVendorLaundryAttributes
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface VendorLaundryCreationAttributes
  extends Optional<VendorLaundryAttributes, 'id'> {}

interface VendorLaundryInstance
  extends Model<VendorLaundryAttributes, VendorLaundryCreationAttributes>,
    VendorLaundryAttributes {}

const VendorLaundry = db.sequelize.define<VendorLaundryInstance>(tableName, {
  ...SequelizeAttributes.old.VendorLaundries,
})

VendorLaundry.associate = (models) => {
  VendorLaundry.belongsTo(models.MasterJenisVendorLaundry)
}

export default VendorLaundry
