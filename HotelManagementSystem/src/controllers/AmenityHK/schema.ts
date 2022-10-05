import * as yup from 'yup'

// schema validasi untuk amenity di HK
const updateAmenityStock = yup.object().shape({
  MasterPenghitunganId: yup.string().required('Penghitungan wajib diisi'),
  MasterKeteranganId: yup.string().required('Keterangan wajib diisi'),
  jumlah: yup.number().nullable(),
})

export default {
  updateAmenityStock,
}
