// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'ProfileHotels'
export interface ProfileHotelAttributes {
  id: string | any
  profileHotelPath: string | any
  nama: string | any
  nomorTelepon: string | any
  email: string | any
  alamat: string | any
  createdAt?: Date
  updatedAt?: Date
}

interface ProfileHotelCreationAttributes
  extends Optional<ProfileHotelAttributes, 'id'> {}

interface ProfileHotelInstance
  extends Model<ProfileHotelAttributes, ProfileHotelCreationAttributes>,
    ProfileHotelAttributes {}

const ProfileHotels = db.sequelize.define<ProfileHotelInstance>(tableName, {
  ...SequelizeAttributes.old.ProfileHotels,
})

export default ProfileHotels
