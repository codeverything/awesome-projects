import * as yup from 'yup'

const create = yup.object().shape({
  nama: yup.string().required('Nama Item wajib diisi'),
  harga: yup
    .number()
    .moreThan(0, 'Harga tidak boleh bernilai negative atau 0')
    .required('Harga Wajib Di isi'),
})

export default {
  create,
}
