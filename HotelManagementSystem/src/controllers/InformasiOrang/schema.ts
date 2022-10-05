import * as yup from 'yup'

const create = yup.object().shape({
  nomorIdentitas: yup
    .number()
    .typeError('Nomor Identitas Harus Angka')
    .required('Nomor Identitas Wajib Diisi'),
  nama: yup
    .string()
    .typeError('Nama Tidak Boleh Kosong')
    .required('Nama Wajib Diisi'),
  email: yup
    .string()
    .email('Harus Format Email')
    .typeError('Email Tidak Boleh Kosong')
    .required('email Wajib Diisi'),
  nomorHandphone: yup
    .string()
    .typeError('Nomor Handphone Tidak Boleh Kosong')
    .required('Nomor Handphone Wajib Diisi'),
  tanggalLahir: yup
    .date()
    .max(new Date(), 'Tanggal Lahir Tidak boleh melebihi tanggal hari ini')
    .nullable(),
  MasterTipeIdentitasId: yup
    .string()
    .uuid('Mohon Dipilih Tipe Identitas')
    .typeError('Tipe Identitas Tidak Boleh Kosong')
    .required('Tipe Identitas Wajib Diisi'),
  MasterTipeTamuId: yup
    .string()
    .uuid('Mohon Dipilih Jenis Kelamin Anda')
    .required('Tipe Tamu Wajib Diisi'),
  alamat: yup.string().nullable(),
  CityId: yup.string().nullable(),
  pekerjaan: yup.string().nullable(),
  jabatan: yup.string().nullable(),
  MasterJenisKelaminId: yup.string().nullable(),
  MasterAgamaId: yup.string().nullable(),
  MasterStatusPerkawinanId: yup.string().nullable(),
  MasterKewarganegaraanId: yup.string().nullable(),
})

export default {
  create,
}
