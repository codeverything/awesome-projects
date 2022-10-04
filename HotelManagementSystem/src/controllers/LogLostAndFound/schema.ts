import * as yup from 'yup'

const updateLostAndFound = yup.object().shape({
  diambilOleh: yup.string().required('Nama Orang wajib diisi'),
  tanggalDiambil: yup.string().nullable(),
})

export default {
  updateLostAndFound,
}
