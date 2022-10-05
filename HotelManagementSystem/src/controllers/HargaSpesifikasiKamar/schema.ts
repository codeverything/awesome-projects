import * as yup from 'yup'

const create = yup.object().shape({
  SpesifikasiKamarId: yup.string().required('Spesifikasi Kamar wajib diisi'),
  tanggalMulai: yup.date().required('Tanggal Mulai Wajib Di isi'),
  tanggalSelesai: yup.date().required('Tanggal Selesai Wajib Di isi'),
  harga: yup
    .number()
    .moreThan(0, 'Max Tamu tidak boleh bernilai 0 atau negatif')
    .required('Harga wajib diisi'),
})

export default {
  create,
}
