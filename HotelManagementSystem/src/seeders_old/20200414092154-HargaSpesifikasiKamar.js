const SequeliceSeed = require('../helpers/SequeliceSeed')

const tableName = 'HargaSpesifikasiKamars'
const data = [
  {
    id: '68981141-91cf-434a-a413-21a85abb88cf',
    createdAt: '2020-04-14 16:07:41',
    updatedAt: '2020-04-14 16:07:41',
    harga: 300000,
    tanggalMulai: '2020-05-08 12:00:00',
    tanggalSelesai: '2020-05-10 12:00:00',
    SpesifikasiKamarId: '6da592d6-4de8-43a5-a45a-49039612857d',
  },
  {
    id: '9d0ec7b2-8051-4129-8df9-e36d98f4e703',
    createdAt: '2020-04-14 16:08:28',
    updatedAt: '2020-04-14 16:08:28',
    harga: 250000,
    tanggalMulai: '2020-05-08 12:00:00',
    tanggalSelesai: '2020-05-10 12:00:00',
    SpesifikasiKamarId: '9ea2cd96-6e7a-43c8-8ef1-f38adaaa1f13',
  },
  {
    id: 'e91d1f8f-23ab-4822-bbf1-93f8e3f9bb80',
    createdAt: '2020-04-14 16:07:41',
    updatedAt: '2020-04-14 16:07:41',
    harga: 200000,
    tanggalMulai: '2020-05-08 12:00:00',
    tanggalSelesai: '2020-05-10 12:00:00',
    SpesifikasiKamarId: '6da592d6-4de8-43a5-a45a-49039612857d',
  },
  {
    id: 'fe6a9123-b9f8-48af-be71-1efc46d77cc1',
    createdAt: '2020-04-14 16:08:28',
    updatedAt: '2020-04-14 16:08:28',
    harga: 150000,
    tanggalMulai: '2020-05-08 12:00:00',
    tanggalSelesai: '2020-05-10 12:00:00',
    SpesifikasiKamarId: '9ea2cd96-6e7a-43c8-8ef1-f38adaaa1f13',
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
