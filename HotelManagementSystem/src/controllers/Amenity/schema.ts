import * as yup from 'yup'

const create = yup.object().shape({
  idItem: yup.string().required('Id Amenity wajib diisi'),
  nama: yup.string().required('Tanggal Akhir wajib diisi'),
  jumlah: yup
    .number()
    .moreThan(0, 'Jumlah tidak boleh bernilai negatif atau 0')
    .required('Jumlah Wajib Di isi'),
})

export default {
  create,
}
