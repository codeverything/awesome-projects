import * as yup from 'yup'

const create = yup.object().shape({
  fullName: yup.string().required('Nama Lengkap wajib diisi'),
  email: yup.string().email('Email tidak valid').required('Email wajib diisi'),
  phone: yup.string().nullable(),
  active: yup.boolean().nullable(),
  userName: yup.string().nullable(),
  RoleId: yup.string().required('Role Wajib Di isi'),
})

const update = yup.object().shape({
  fullName: yup.string().required('Nama Lengkap wajib diisi'),
  email: yup.string().email('Email tidak valid').required('Email wajib diisi'),
  phone: yup.string().required('Phone wajib diisi'),
  active: yup.boolean().nullable(),
  tokenVerify: yup.string().nullable(),
})

const createPassword = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, 'Minimal 8 karakter')
    .oneOf([yup.ref('confirmNewPassword')], 'Password tidak sama'),
  confirmNewPassword: yup
    .string()
    .min(8, 'Minimal 8 karakter')
    .oneOf([yup.ref('newPassword')], 'Password tidak sama'),
})

const login = yup
  .object()
  .shape({
    email: yup
      .string()
      .email('Email tidak valid')
      .required('Email wajib diisi'),
    password: yup
      .string()
      .min(8, 'Minimal 8 karakter')
      .required('Password wajib diisi'),
  })
  .required()

export default {
  create,
  createPassword,
  update,
  login,
}
