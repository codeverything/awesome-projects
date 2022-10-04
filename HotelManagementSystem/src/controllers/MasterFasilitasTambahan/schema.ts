import * as yup from 'yup'

const create = yup.object().shape({
  JenisFasilitasTambahanId: yup
    .string()
    .uuid('Harus Berupa UUID')
    .typeError('Jenis Fasilitas Tambahan Wajib Diisi')
    .required('Jenis Fasilitas Tambahan Wajib Diisi'),
  MasterSourcePemesananId: yup
    .string()
    .uuid('Harus Berupa UUID')
    .typeError('Source Pemesanan Wajib Diisi')
    .required('Source Pemesanan Wajib Diisi wajib diisi'),
  harga: yup
    .number()
    .typeError('Harga Harus Berupa Angka')
    .required('Harga Wajib Diisi wajib diisi'),
})

export default {
  create,
}
