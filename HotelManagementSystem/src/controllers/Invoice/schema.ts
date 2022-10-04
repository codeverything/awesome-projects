import * as yup from 'yup'

export const createInvoicePembayaran = yup.object().shape({
  MasterItemPembayaranId: yup
    .string()
    .required('Item Pembayaran Wajib di isi Deposit atau Pembayaran'),
  MasterTipePembayaranId: yup.string().required('Tipe Pembayaran Wajib Diisi'),
  nilai: yup.number().required('Jumlah Yang Dibayarkan Wajib Diisi'),
  keterangan: yup.string().nullable(),
})
export const createInvoiceTambahan = yup.object().shape({
  MasterFasilitasTambahanId: yup
    .string()
    .required('Fasilitas Tambahan Wajib Diisi'),
  jumlah: yup
    .number()
    .moreThan(0, 'Jumlah tidak boleh 0 atau negative')
    .required('Jumlah Fasilitas Tambahan Wajib diisi'),
  jumlahHarga: yup.number().nullable(),
  nilaiHarga: yup.number().nullable(),
  keterangan: yup.string().nullable(),
})
