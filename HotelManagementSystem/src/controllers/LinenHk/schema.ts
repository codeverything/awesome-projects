import * as yup from 'yup'

const create = yup.object().shape({
  LinenId: yup.string().required('Linen wajib diisi'),
  VendorLaundryId: yup.string().required('Vendor wajib diisi'),
  keluarKotor: yup.number().nullable(),
  masukBersih: yup.number().nullable(),
})

const updateLinenStock = yup.object().shape({
  MasterPenghitunganId: yup.string().required('Penghitungan wajib diisi'),
  MasterKeteranganId: yup.string().required('Keterangan wajib diisi'),
  jumlah: yup.number().nullable(),
})

export default {
  create,
  updateLinenStock,
}
