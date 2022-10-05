/* eslint-disable no-unused-vars */
import { Model, Optional, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'
import SequelizeAttributes from 'utils/SequelizeAttributes'
import schemaUser from 'controllers/User/schema'
import db from './_instance'
import { RoleAttributes } from './role'

export interface UserAttributes {
  id: string
  nickName: any
  fullName?: string | any
  email?: string | any
  password?: string | any
  phone?: string | any
  active?: boolean | null | any
  tokenVerify?: string | null | any
  newPassword?: string | any
  confirmNewPassword?: string | any
  RoleId?: string | any
  imagePath: string | any
  Role?: RoleAttributes
  userName?: string | any
  hakAkses?: string | any
  createdAt?: Date
  updatedAt?: Date
}

export interface TokenAttributes {
  data: UserAttributes
  message: string
}

export interface LoginAttributes {
  email: string
  password: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  comparePassword(): boolean | void
}

const User = db.sequelize.define<UserInstance>(
  'Users',
  {
    ...SequelizeAttributes.old.Users,
    newPassword: {
      type: DataTypes.VIRTUAL,
    },
    confirmNewPassword: {
      type: DataTypes.VIRTUAL,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: bcrypt.hashSync('nusalink123', 10),
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['tokenVerify'],
      },
    },
    scopes: {
      withPassword: {},
    },
  }
)

function setUserPassword(instance: UserInstance) {
  // const { newPassword, confirmNewPassword } = instance
  // const fdPassword = { newPassword, confirmNewPassword }
  // const validPassword = schemaUser.createPassword.validateSyncAt(
  //   'confirmNewPassword',
  //   fdPassword
  // )
  const saltRounds = 10
  const hash = bcrypt.hashSync('nusalink123', saltRounds)
  instance.setDataValue('password', hash)
}

User.addHook('beforeCreate', setUserPassword)
User.addHook('beforeUpdate', (instance: UserInstance) => {
  const { newPassword, confirmNewPassword } = instance
  if (newPassword || confirmNewPassword) {
    setUserPassword(instance)
  }
})

// Compare password
User.prototype.comparePassword = function (candidatePassword: string) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) reject(err)
      resolve(isMatch)
    })
  })
}

User.associate = (models) => {
  User.belongsTo(models.Role)
}

export default User
