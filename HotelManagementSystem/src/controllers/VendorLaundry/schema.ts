import * as yup from 'yup'

const create = yup.object().shape({
  nama: yup.string().required('Nama wajib diisi'),
  idVendor: yup.string().required('Id Vendor wajib diisi'),
  alamat: yup.string().required('Alamat Perusahaan wajib diisi'),
  kontak: yup.string().required('Kontak wajib diisi'),
  MasterJenisVendorLaundryId: yup
    .string()
    .required('Jenis Vendor Laundry wajib diisi'),
})

export default {
  create,
}
