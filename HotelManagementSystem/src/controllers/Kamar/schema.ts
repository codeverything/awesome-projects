import * as yup from 'yup'

const create = yup.object().shape({
  nomor: yup.string().required('Nomor Kamar wajib diisi'),
  SpesifikasiKamarId: yup.string().required('Spesifikasi Kamar Wajib Di isi'),
  MasterStatusHKId: yup.string().required('Status House Keeping Wajib Di isi'),
  MasterStatusKamarId: yup.number().required('Status Kamar Wajib Di isi'),
  // connected: yup.boolean().default(false),
  // kamar: yup.object({
  //   id: yup.string().when('connected', {
  //     is: true,
  //     otherwise: yup.string().required('Kamar Wajib Dipiih karena Connected'),
  //   }),
  //   nomor: yup.string().when('connected', {
  //     is: true,
  //     otherwise: yup.string().required('Kamar Wajib Dipiih karena Connected'),
  //   }),
  // }),
})

export default {
  create,
}
