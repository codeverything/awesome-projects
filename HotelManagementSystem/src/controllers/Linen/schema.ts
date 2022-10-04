import * as yup from 'yup'

const create = yup.object().shape({
  idItem: yup.string().required('Id Item wajib diisi'),
  nama: yup.string().required('Tanggal Akhir wajib diisi'),
  jumlah: yup
    .number()
    .moreThan(0, 'Nilai Deposit tidak boleh bernilai negative atau 0')
    .required('Jumlah Wajib Di isi'),
})

export default {
  create,
}
