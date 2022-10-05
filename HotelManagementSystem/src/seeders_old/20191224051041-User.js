const bcrypt = require('bcrypt')
const SequeliceSeed = require('../helpers/SequeliceSeed')
const { ConstRole } = require('../constants')

const plainTextPass = 'dicoba123'
const saltRounds = 10
const hash = bcrypt.hashSync(plainTextPass, saltRounds)
const tableName = 'Users'
const data = [
  {
    id: '05cb6622-5cf7-40b8-ade4-7f4565096e99',
    fullName: 'admin',
    email: 'admin@email.com',
    active: 1,
    userName: 'aduhmin',
    password: hash,
    RoleId: ConstRole.SUPERADMIN,
  },
  {
    id: '78c0c919-04f7-458f-b5d6-4f24562b67ea',
    fullName: 'Bayu Gunawan',
    email: 'bayu@gmail.com',
    password: hash,
    userName: 'masBay',
    active: 1,
    RoleId: ConstRole.HK_LEADER,
  },
  {
    id: '15f3f7d8-743a-473d-ba0c-ac3a45563af2',
    fullName: 'Andi Wirandi',
    email: 'andi@gmail.com',
    password: hash,
    userName: 'andikun',
    active: 1,
    RoleId: ConstRole.HK_STAFF,
  },
  {
    id: '028748b1-8c8f-4661-83e9-5305091db0cc',
    fullName: 'Agus Rusadi ',
    email: 'agus@gmail.com',
    password: hash,
    userName: 'gus',
    active: 1,
    RoleId: ConstRole.HK_STAFF,
  },
  {
    id: '59e67b0c-f09c-4bbe-9c80-ec11c37c42db',
    fullName: 'Front Office',
    email: 'fo@email.com',
    password: hash,
    userName: 'camel',
    active: 1,
    RoleId: ConstRole.FRONT_OFFICE,
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
