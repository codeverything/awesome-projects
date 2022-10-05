import * as yup from 'yup'

const create = yup.object().shape({
  nama: yup.string().required('Nama wajib diisi'),
  hakAkses: yup.string().required('Hak Akses Wajib Di isi'),
})

export default {
  create,
}
