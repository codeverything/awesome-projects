/* eslint-disable no-unused-vars */
const { DataTypes } = require('sequelize')
const fs = require('fs')
const path = require('path')

const env = process.env.NODE_ENV || 'development'

function getCurrentWorkDir() {
  if (env === 'production') {
    return 'dist'
  }
  return 'src'
}

/*
 get attributes dari migration saja agar
 tidak susah payah harus copy paste
 */
function getAttributesFrom(arrColumnsMigrations) {
  let attributes = {}

  for (let i = 0; i < arrColumnsMigrations.length; i += 1) {
    const { create, add, change, remove } = arrColumnsMigrations[i]

    const file = create || add || change

    if (file) {
      attributes = {
        ...attributes,
        ...file.columns,
      }
    } else if (remove) {
      const keys = Object.keys(remove.columns)
      for (let x = 0; x < keys.length; x += 1) {
        const key = keys[x]
        delete attributes[key]
      }
    }
  }
  return attributes
}

function getAttrFromFolder(folder) {
  const curFolder = path.resolve([getCurrentWorkDir(), folder].join('/'))
  const files = fs.readdirSync(curFolder)

  const data = []

  files.forEach((fileName) => {
    const [timeStamp, mode, tableName] = fileName.split('-')
    const path = [curFolder, fileName].join('/')
    data.push({
      // eslint-disable-next-line import/no-dynamic-require,global-require
      [mode]: require(path),
    })
  })

  return getAttributesFrom(data)
}

class Type {
  static primaryKeyInteger(disallowNull = false, props = {}) {
    return {
      allowNull: !disallowNull,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      ...props,
    }
  }

  static foreignKeyUUID(disallowNull = false, props = {}) {
    return {
      allowNull: !disallowNull,
      type: DataTypes.UUID,
      ...props,
    }
  }

  static integer(disallowNull = false, props = {}) {
    return {
      allowNull: !disallowNull,
      type: DataTypes.INTEGER,
      ...props,
    }
  }

  static text(disallowNull = false, props = {}) {
    return {
      allowNull: !disallowNull,
      type: DataTypes.UUID,
      ...props,
    }
  }

  static string(disallowNull = false, props = {}) {
    return {
      allowNull: !disallowNull,
      type: DataTypes.STRING,
      ...props,
    }
  }

  static phoneNumber(disallowNull = false, props = {}) {
    return this.string(disallowNull, props)
  }

  static email(disallowNull = false, props = {}) {
    return this.string(disallowNull, props)
  }

  static date(disallowNull = false, props = {}) {
    return {
      allowNull: !disallowNull,
      type: DataTypes.DATE,
      ...props,
    }
  }

  static time(disallowNull = false, props = {}) {
    return {
      allowNull: !disallowNull,
      type: DataTypes.TIME,
      ...props,
    }
  }

  static uang(disallowNull = false, props = {}) {
    return {
      allowNull: !disallowNull,
      type: DataTypes.BIGINT,
      ...props,
    }
  }

  static tanggalCheckInCheckOut(disallowNull = false, props = {}) {
    return this.date(disallowNull, props)
  }

  static tanggalBerlaku(disallowNull = false, props = {}) {
    return this.date(disallowNull, props)
  }
}

module.exports = {
  Type,
  getAttributesFrom,
  getAttrFromFolder,
}
