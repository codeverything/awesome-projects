// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

const tableName = 'MasterStatusLostAndFounds'

export interface MasterStatusLostAndFoundsAttributes {
  id: string
  nama: string
  createdAt?: Date
  updatedAt?: Date
}

interface MasterStatusLostAndFoundCreationAttributes
  extends Optional<MasterStatusLostAndFoundsAttributes, 'id'> {}

interface MasterStatusLostAndFoundInstance
  extends Model<
      MasterStatusLostAndFoundsAttributes,
      MasterStatusLostAndFoundCreationAttributes
    >,
    MasterStatusLostAndFoundsAttributes {}

const MasterStatusLostAndFound = db.sequelize.define<
  MasterStatusLostAndFoundInstance
>(tableName, {
  ...SequelizeAttributes.old.MasterStatusLostAndFounds,
})
export default MasterStatusLostAndFound
