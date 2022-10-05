import * as yup from 'yup'

const checkPromo = yup.object().shape({
  promo: yup.string().typeError('Kok Error').required('Kode wajib diisi'),
})
const create = yup.object().shape({
  nama: yup.string().required('Nama Promo wajib diisi'),
  kuota: yup
    .number()
    .moreThan(0, 'Kuota tidak boleh negative atau bernilai 0')
    .required('Kuota wajib diisi'),
  tanggalMulai: yup.date().required('Tanggal Mulai Wajib Di isi'),
  tanggalSelesai: yup.date().required('Tanggal Selesai Wajib Di isi'),
  kode: yup.string().required('Kode Wajib Di isi'),
  nilai: yup
    .number()
    .moreThan(0, 'Nilai Promo tidak boleh bernilai 0 atau negative')
    .required('Nilai Promo Wajib Di isi'),
  MasterTipePromoId: yup.string().required('Master Tipe Promo Wajib Di isi'),
})

export default {
  checkPromo,
  create,
}
