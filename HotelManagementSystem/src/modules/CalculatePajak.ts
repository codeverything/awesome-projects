const AppConst = require('constants/index')

function getPajak(harga: number) {
  return harga * AppConst.ConstNumber.Pajak
}

export default getPajak
