import * as yup from 'yup'

const createLinen = yup.object({
  barangId: yup.string().nullable(),
  jumlah: yup.number().when('barangId', {
    is: true,
    then: yup.number().required('Jumlah Wajib Di isi'),
  }),
  MasterTagihanKerusakanKehilanganId: yup.string().when('barangId', {
    is: true,
    then: yup.string().required('Status Barang Wajib Di isi'),
  }),
})

const createAmenity = yup.object({
  jumlah: yup
    .number()
    .min(1, 'Jumlah yang di input tidak boleh 0 atau negatif')
    .required(),
})

const createLostAndFound = yup.object({
  namaBarang: yup
    .string()
    .typeError('Nama barang wajib di isi')
    .required('Nama barang wajib diisi'),
  jumlah: yup
    .number()
    .typeError('Jumlah Barang Wajib Di isi')
    .min(1, 'Jumlah yang di input tidak boleh 0 atau negatif')
    .required('Jumlah Barang Wajib Di isi'),
})
export default {
  createLinen,
  createAmenity,
  createLostAndFound,
}
