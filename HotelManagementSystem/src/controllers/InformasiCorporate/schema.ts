import * as yup from 'yup'

const create = yup.object().shape({
  nama: yup.string().required('Nama Perusahaan wajib diisi'),
  email: yup.string().required('Email Akhir wajib diisi'),
  nomorHandphone: yup.string().required('Nomor Handphone Akhir wajib diisi'),
  alamat: yup
    .string()
    .typeError('Alamat Perusahaaan Wajib Diisi')
    .required('Alamat Perusahaan wajib diisi'),
})

export default {
  create,
}
