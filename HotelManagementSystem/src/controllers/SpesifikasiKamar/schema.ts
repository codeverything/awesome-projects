import * as yup from 'yup'

const create = yup.object().shape({
  nama: yup.string().required('Nama wajib diisi'),
  MasterTipeKamarId: yup.string().required('Tipe Kamar wajib diisi'),
  MasterTipeKasurId: yup.string().required('Tipe Kasur wajib diisi'),
  MasterSpecialRequirementId: yup
    .string()
    .required('Special Requirement wajib diisi'),
  maxTamu: yup
    .number()
    .moreThan(0, 'Max Tamu tidak boleh bernilai 0 atau negatif')
    .required('Max Tamu wajib diisi'),
  defaultHargaKamar: yup
    .number()
    .typeError('Harga Wajib Di isi')
    .moreThan(0, 'Harga tidak boleh bernilai 0 atau negatif')
    .required('Harga wajib diisi'),
})

export default {
  create,
}
