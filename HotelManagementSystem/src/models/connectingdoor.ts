// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'ConnectingDoors'

export interface ConnectingDoorAttributes {
  id: string
  KamarId: string
  KamarConnectId: string
  createdAt?: Date
  updatedAt?: Date
}

interface ConnectingDoorCreationAttributes
  extends Optional<ConnectingDoorAttributes, 'id'> {}

interface ConnectingDoorInstance
  extends Model<ConnectingDoorAttributes, ConnectingDoorCreationAttributes>,
    ConnectingDoorAttributes {}

const ConnectingDoor = db.sequelize.define<ConnectingDoorInstance>(tableName, {
  ...SequelizeAttributes.old.ConnectingDoors,
})
ConnectingDoor.associate = (models) => {
  ConnectingDoor.belongsTo(models.Kamar)
}

export default ConnectingDoor
