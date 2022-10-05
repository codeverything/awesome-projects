import * as yup from 'yup'

const generateExcell = yup.object().shape({
  startDate: yup.string().required('Tanggal Awal wajib diisi'),
  endDate: yup.string().required('Tanggal Akhir wajib diisi'),
})

export default {
  generateExcell,
}
