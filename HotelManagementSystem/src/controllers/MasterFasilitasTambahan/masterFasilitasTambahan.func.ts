const models = require('models')
const ResponseError = require('modules/ResponseError')

const { LogHargaMasterFasilitasTambahan } = models

async function funGetHargaFasilitasTambahan(MasterFasilitasTambahanId: string) {
  const logHarga = await LogHargaMasterFasilitasTambahan.findOne({
    where: {
      MasterFasilitasTambahanId,
    },
    order: [['createdAt', 'DESC']],
    raw: true,
  })

  if (!logHarga) {
    throw new ResponseError.NotFoundError(
      'Harga Fasilitas Tambahan tidak ditemukan, silahkan setting terlebih dahulu di Halaman Admin'
    )
  }

  const harga = logHarga.harga || 0

  return {
    id: logHarga.id,
    columnName: 'LogHargaMasterFasilitasTambahanId',
    harga,
  }
}

export default funGetHargaFasilitasTambahan
