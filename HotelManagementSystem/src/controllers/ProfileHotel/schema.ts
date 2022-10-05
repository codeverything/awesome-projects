import * as yup from 'yup'

const create = yup.object().shape({
  nama: yup.string().required('Nama wajib diisi'),
  nomorTelepon: yup.string().required('Nomor Telepon Wajib Di isi'),
  email: yup
    .string()
    .email('Harus Format Email')
    .required('Nomor Telepon Wajib Di isi'),
  alamat: yup.string().required('Alamat Wajib Di isi'),
})

export default {
  create,
}
