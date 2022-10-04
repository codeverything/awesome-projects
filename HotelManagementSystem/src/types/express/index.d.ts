/* eslint-disable no-unused-vars */
import withState from 'helpers/withState'
import multer from 'multer'
import { IUserData } from 'controllers/RoomHK/baseInterface'

declare global {
  namespace Express {
    // interface Mutler {
    //   File: any
    // }
    interface Request extends withState {
      state: object
      _transaction: any
      tokenPublicDecoded: any
      token: any
    }
  }
}
