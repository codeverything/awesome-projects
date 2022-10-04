/* eslint-disable no-unused-vars */
import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { ProfileHotelAttributes } from 'models/profilehotel'
import { Transaction } from 'sequelize'
import fs from 'fs'
import { isString } from 'lodash'
import schema from './schema'

const { ProfileHotel } = models
interface IProfileHotel extends ProfileHotelAttributes {
  profileHotel: any
}

class ProfileHotelService {
  /**
   * Get One Role
   */
  public static async getOne() {
    const data = await ProfileHotel.findOne()

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  public static async getDetail(id: string) {
    const data = await ProfileHotel.findByPk(id)

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create Role
   */
  public static async create(formData: IProfileHotel, txn: Transaction) {
    useValidation(schema.create, formData)
    const data = await ProfileHotel.create(formData, {
      transaction: txn,
    })
    if (formData.profileHotel) {
      await data.update(
        {
          profileHotelPath: formData.profileHotel.path.replace('public', ''),
        },
        {
          transaction: txn,
        }
      )
    }
    return data
  }

  /**
   * Update Role By Id
   */
  public static async update(formData: IProfileHotel, txn: Transaction) {
    const data = await this.getOne()
    delete formData.profileHotelPath
    const value = useValidation(schema.create, {
      ...data.toJSON(),
      ...formData,
    })
    if (!isString(formData.profileHotel)) {
      // ini buat hapus data gambar hotel
      const pathToDelete = data.profileHotelPath.replace('', 'public')
      fs.unlink(pathToDelete, (err) => {
        if (err) throw new ResponseError.BadRequest('Unknown Error Occured')
        console.log('File Has Been Deleted')
      })
      await data.update(
        {
          ...value,
          profileHotelPath: formData.profileHotel.path.replace('public', ''),
        },
        {
          transaction: txn,
        }
      )
    } else {
      await data.update(
        { ...value, profileHotelPath: formData.profileHotel } || {},
        {
          transaction: txn,
        }
      )
    }

    return data
  }

  /**
   * Delete Role By Id
   */
  public static async delete() {
    const data = await this.getOne()
    await data.destroy()
  }
}

export default ProfileHotelService
