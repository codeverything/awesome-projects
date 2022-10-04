// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterJenisVendorLaundries'

export interface MasterJenisVendorLaundryAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterJenisVendorLaundryCreationAttributes
  extends Optional<MasterJenisVendorLaundryAttributes, 'id'> {}

interface MasterJenisVendorLaundryInstance
  extends Model<
      MasterJenisVendorLaundryAttributes,
      MasterJenisVendorLaundryCreationAttributes
    >,
    MasterJenisVendorLaundryAttributes {}

const MasterJenisVendorLaundry = db.sequelize.define<
  MasterJenisVendorLaundryInstance
>(tableName, {
  ...SequelizeAttributes.old.MasterJenisVendorLaundries,
})

export default MasterJenisVendorLaundry
