import * as yup from 'yup'

const cancelReservasi = yup.object().shape({
  nilai: yup
    .number()
    .min(0, 'Tidak Boleh Bernilai Negatif')
    .required('Nilai Deposit wajib di isi'),
  keterangan: yup.string().nullable(),
})

const informasiOrangSchema = yup.object().shape({
  nomorIdentitas: yup
    .number()
    .typeError('Nomor Identitas Harus Angka')
    .required('Nomor Identitas Wajib Diisi'),
  nama: yup
    .string()
    .typeError('Nama Tidak Boleh Kosong')
    .required('Nama Wajib Diisi'),
  email: yup
    .string()
    .email('Harus Format Email')
    .typeError('Email Tidak Boleh Kosong')
    .required('email Wajib Diisi'),
  nomorHandphone: yup
    .string()
    .typeError('Nomor Handphone Tidak Boleh Kosong')
    .required('Nomor Handphone Wajib Diisi'),
  tanggalLahir: yup
    .date()
    .max(new Date(), 'Tanggal Lahir Tidak boleh melebihi tanggal hari ini')
    .nullable(),
  MasterTipeIdentitasId: yup
    .string()
    .uuid('Mohon Dipilih Tipe Identitas')
    .typeError('Tipe Identitas Tidak Boleh Kosong')
    .required('Tipe Identitas Wajib Diisi'),
  MasterTipeTamuId: yup
    .string()
    .uuid('Mohon Dipilih Jenis Kelamin Anda')
    .required('Tipe Tamu Wajib Diisi'),
  alamat: yup.string().nullable(),
  CityId: yup.string().nullable(),
  pekerjaan: yup.string().nullable(),
  jabatan: yup.string().nullable(),
  MasterJenisKelaminId: yup.string().nullable(),
  MasterAgamaId: yup.string().nullable(),
  MasterStatusPerkawinanId: yup.string().nullable(),
  MasterKewarganegaraanId: yup.string().nullable(),
})

const reservasiSchema = yup.object().shape({
  MasterSourcePemesananId: yup
    .string()
    .required('Source Pemesanan Id Wajib Diisi'),
  jumlahTamu: yup.number().required('Jumlah Tamu Wajib Diisi'),
  nilaiDeposit: yup
    .number()
    .moreThan(0, 'Nilai Deposit tidak boleh bernilai negative atau 0')
    .nullable(),
  JenisPembayaranId: yup.string().required('Jenis Pembayaran Wajib Diisi'),
  promo: yup.string().nullable(),
  downPayment: yup.string().nullable(),
  namaOTA: yup.string().nullable(),
  kodeBooking: yup.string().nullable(),
})

const checkIn = yup.object().shape({
  tipeRoom: yup.array().required('Kamar Wajib Dipilih'),
})

export default {
  cancelReservasi,
  informasiOrangSchema,
  reservasiSchema,
  checkIn,
}
