import path from 'path'
import models from 'models'
import jwt from 'jsonwebtoken'
import { isObject, filter } from 'lodash'
import createDirNotExist from 'utils/Directory'
import ResponseError from 'modules/Response/ResponseError'
import { getUniqueCodev2, readHTMLFile } from 'helpers/Common'
import {
  UserAttributes,
  LoginAttributes,
  TokenAttributes,
  UserInstance,
} from 'models/user'
import { Transaction } from 'sequelize'

const { User, Role } = models

interface IUpdateProfile {
  imagePath: {
    path: string
  }
  fullName: string
  nickName: string
  email: string
  password: string
  newPassword: string
  confirmNewPassword: string
}
const { JWT_SECRET }: any = process.env
const expiresToken = 7 * 24 * 60 * 60 // 7 Days

/*
  Create the main directory
  The directory will be created automatically when logged in,
  because there is a directory that uses a User ID
*/
async function createDirectory(UserId: string) {
  const pathDirectory = [
    './public/uploads/csv',
    './public/uploads/pdf',
    './public/uploads/excel',
    `./public/uploads/profile/${UserId}`,
  ]

  pathDirectory.map((x) => createDirNotExist(x))
}

class AuthService {
  /**
   * Sign Up
   */
  public static async signUp(formData: UserAttributes) {
    const generateToken = {
      code: getUniqueCodev2(),
    }

    const tokenVerify = jwt.sign(
      JSON.parse(JSON.stringify(generateToken)),
      JWT_SECRET,
      {
        expiresIn: expiresToken,
      }
    ) // 1 Days

    const newFormData = { ...formData, tokenVerify }
    const data = await User.create(newFormData)

    /*
      Initial Send an e-mail
    */
    const pathTemplate = path.resolve(
      __dirname,
      `../../../public/templates/emails/register.html`
    )

    readHTMLFile(pathTemplate, (error: Error, html: any) => {
      if (error) {
        throw new ResponseError.NotFound('email template not found')
      }

      // Email.send(email, subject, htmlToSend)
    })

    return {
      message:
        'registration is successful, check your email for the next steps',
      data,
    }
  }

  /**
   * Sign In
   */
  public static async signIn(formData: LoginAttributes) {
    const { email, password } = formData
    const userData = await User.scope('withPassword').findOne({
      where: { email },
      include: [
        {
          model: Role,
        },
      ],
    })
    if (!userData) {
      throw new ResponseError.NotFound('data not found or has been deleted')
    }

    /* User active proses login */
    if (userData.active) {
      // @ts-ignore
      const comparePassword = userData.comparePassword(password)
      if (comparePassword) {
        // modif payload token
        const payloadToken = {
          id: userData.id,
          nama: userData.fullName,
          nickName: userData.userName,
          active: userData.active,
          RoleId: userData.RoleId,
        }
        const token = jwt.sign(
          JSON.parse(JSON.stringify(payloadToken)),
          JWT_SECRET,
          {
            expiresIn: expiresToken,
          }
        ) // 1 Days

        // create directory
        await createDirectory(userData.id)

        const role = await Role.findByPk(userData.RoleId)
        if (!role?.hakAkses)
          throw new ResponseError.Unauthorized(
            'Mohon Hubungi Admin Untuk Penyesuaian Hak Akses Anda'
          )
        const listHakAkses: any = filter(
          role?.hakAkses,
          (x: any) => x.defaultPage
        )
        if (!listHakAkses.length)
          throw new ResponseError.Forbidden(
            'Segera hubungi admin untuk penyesuaian default page anda'
          )
        return {
          token: `Bearer ${token}`,
          expiresIn: expiresToken,
          tokenType: 'Bearer',
          defaultPage: {
            nama: listHakAkses[0].nama,
            path: listHakAkses[0].path,
            checked: listHakAkses[0].checked,
            defaultPage: listHakAkses[0].defaultPage,
          },
        }
      }

      throw new ResponseError.BadRequest('incorrect email or password!')
    }

    /* User not active return error confirm email */
    throw new ResponseError.BadRequest(
      'please check your email account to verify your email and continue the registration process.'
    )
  }

  /**
   * Profile
   */
  public static async profile(token: TokenAttributes) {
    if (isObject(token?.data)) {
      const decodeToken = token?.data
      const including = [{ model: Role }]

      // @ts-ignore
      const data = await User.scope('withPassword').findByPk(decodeToken?.id, {
        attributes: { exclude: ['password', 'tokenVerify'] },
        include: including,
      })
      return data
    }

    throw new ResponseError.Unauthorized(
      `${token?.message}. Please Re-login...`
    )
  }

  public static async editProfile(
    data: UserInstance,
    formData: IUpdateProfile,
    txn: Transaction
  ) {
    await data?.update(
      {
        ...formData,
        userName: formData.nickName,
      },
      { transaction: txn }
    )

    return data
  }

  public static async editImage(
    token: any,
    formData: IUpdateProfile,
    txn: Transaction
  ) {
    const data = await this.profile(token)
    await data?.update(
      {
        imagePath: formData.imagePath.path.replace('public', ''),
      },
      { transaction: txn }
    )

    return data
  }
}
export default AuthService
