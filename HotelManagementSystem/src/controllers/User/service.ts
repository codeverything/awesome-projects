import models from 'models'
import ResponseError from 'modules/Response/ResponseError'
import useValidation from 'helpers/useValidation'
import { UserAttributes } from 'models/user'
import { Request } from 'express'
import { Transaction } from 'sequelize/types'
import PluginSqlizeQuery from 'modules/SqlizeQuery/PluginSqlizeQuery'
import bcrypt from 'bcrypt'
import AuthService from 'controllers/Auth/service'
import schema from './schema'

const { User, Role } = models
const including = [{ model: Role }]

interface IChangePassword {
  password: string
  newPassword: string
  confirmNewPassword: string
}

class UserService {
  /**
   * Get All User
   */
  public static async getAll(req: Request) {
    const { filtered } = req.query
    const { includeCount, order, ...queryFind } = PluginSqlizeQuery.generate(
      req,
      User,
      PluginSqlizeQuery.makeIncludeQueryable(filtered, including)
    )

    const data = await User.findAll({
      ...queryFind,
      order: order.length ? order : [['createdAt', 'desc']],
    })
    const total = await User.count({
      include: includeCount,
      where: queryFind.where,
    })
    const filteredData = data.map((x) => {
      return {
        id: x.id,
        nama: x.fullName,
        email: x.email,
        nickName: x.userName,
        role: x.Role!.nama,
      }
    })
    return {
      message: `${total} data has been received.`,
      data: filteredData,
      total,
    }
  }

  /**
   * Get One User
   */
  public static async getOne(id: string) {
    const data = await User.findByPk(id, {
      include: including,
    })

    if (!data) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    return data
  }

  /**
   * Create User
   */
  public static async create(formData: UserAttributes, txn?: Transaction) {
    // useValidation(schema.create, formData)

    await User.create(
      { ...formData, userName: formData.nickName },
      {
        transaction: txn,
      }
    )

    return 'success create user'
  }

  public static async changePassword(
    formData: IChangePassword,
    token: any,
    txn: Transaction
  ) {
    const { password, newPassword, confirmNewPassword } = formData
    const data = await AuthService.profile(token)
    const user = await User.scope('withPassword').findOne({
      where: { id: data?.id },
      transaction: txn,
    })
    const checkPassword = bcrypt.compareSync(password, user?.password)
    if (!checkPassword) throw new ResponseError.Unauthorized('Password Salah')
    useValidation(schema.createPassword, {
      newPassword,
      confirmNewPassword,
    })
    await user?.update(
      { password: bcrypt.hashSync(newPassword, 10) },
      {
        transaction: txn,
      }
    )
    return 'Password Berhasil Diubah'
  }

  /**
   * Update User By Id
   */
  public static async update(
    id: string,
    formData: UserAttributes,
    txn?: Transaction
  ) {
    const data = await this.getOne(id)

    await data.update({ ...formData, userName: formData.nickName } || {}, {
      transaction: txn,
    })

    return data
  }

  /**
   * Delete User By Id
   */
  public static async delete(id: string) {
    const data = await this.getOne(id)

    await data.destroy()
  }
}

export default UserService
