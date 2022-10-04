import * as yup from 'yup'

export const updateProfile = yup.object().shape({
  fullName: yup.string().required('Nama Lengkap Wajib Di isi'),
  nickName: yup.string().required('Nama Panggilan Wajib Diisi'),
  email: yup.string().email('Harus Format Email').required('Email Wajib Diisi'),
  password: yup.string().nullable(),
  newPassword: yup
    .string()
    .min(8, 'Minimal 8 karakter')
    .oneOf([yup.ref('confirmNewPassword')], 'Password tidak sama'),
  confirmNewPassword: yup
    .string()
    .min(8, 'Minimal 8 karakter')
    .oneOf([yup.ref('newPassword')], 'Password tidak sama'),
})
