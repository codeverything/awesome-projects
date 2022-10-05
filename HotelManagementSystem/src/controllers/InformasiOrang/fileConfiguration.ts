import fs from 'fs'
import ResponseError from 'modules/Response/ResponseError'

export default class FileConfiguration {
  path: string

  constructor(path: string) {
    this.path = path
  }

  deleteImage() {
    fs.unlink(this.path.replace('', 'public'), (err) => {
      if (err) throw new ResponseError.BadRequest('Unknown Error Occured')
      console.log('File Has Been Deleted')
    })
  }
}
