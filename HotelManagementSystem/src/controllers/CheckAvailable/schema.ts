import * as yup from 'yup'

const checkSpesifikasi = yup.object().shape({
  tanggalCheckIn: yup.date().required('Tanggal Check In Wajib Diisi'),
  tanggalCheckOut: yup.date().required('Tanggal Check Out Wajib Diisi'),
  SpesifikasiKamarId: yup.string().required('SpesifikasiKamar wajib diisi'),
  // MasterSpecialRequirementId: yup
  //   .string()
  //   .required('Special Requirement Wajib Diisi'),
  // MasterTipeKasurId: yup.string().required('Tipe Kasur Wajib Diisi'),
  // MasterTipeKamarId: yup.string().required('Tipe Kamar Wajib Diisi'),
})

const editHarga = yup.object().shape({
  harga: yup
    .number()
    .moreThan(0, 'Max Tamu tidak boleh bernilai 0 atau negatif')
    .required('Tanggal Check In Wajib Diisi'),
})

export default {
  checkSpesifikasi,
  editHarga,
}
