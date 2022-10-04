// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterSpecialRequirements'
export interface MasterSpecialRequirementAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterSpecialRequirementCreationAttributes
  extends Optional<MasterSpecialRequirementAttributes, 'id'> {}

interface MasterSpecialRequirementInstance
  extends Model<
      MasterSpecialRequirementAttributes,
      MasterSpecialRequirementCreationAttributes
    >,
    MasterSpecialRequirementAttributes {}

const MasterSpecialRequirement = db.sequelize.define<
  MasterSpecialRequirementInstance
>(tableName, {
  ...SequelizeAttributes.old.MasterSpecialRequirements,
})

export default MasterSpecialRequirement
