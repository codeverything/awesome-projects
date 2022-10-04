const SequeliceSeed = require('helpers/SequeliceSeed')

const tableName = 'Amenities'
const data = [
  {
    id: '0a232409-5f2a-4a5c-a14d-e552e90bcd12',
    idItem: 'AM09',
    nama: 'Sanitary Bag',
    jumlah: 16,
  },
  {
    id: '1e3baff2-6f9b-4dd5-9961-fb6a4c7060fc',
    idItem: 'AM05',
    nama: 'Tooth Paste',
    jumlah: 23,
  },
  {
    id: '2ce2e50a-013e-4407-85dd-6652520f8255',
    idItem: 'AM06',
    nama: 'Tissue',
    jumlah: 10,
  },
  {
    id: '31bbd781-a823-4c0a-bb6d-b5b347d1cbd8',
    idItem: 'AM08',
    nama: 'Shower Cap',
    jumlah: 16,
  },
  {
    id: '466c9d14-dced-4bb9-8675-1ece0a5a1573',
    idItem: 'AM12',
    nama: 'Shaving Kit',
    jumlah: 5,
  },
  {
    id: '56f63e8c-55b7-40a1-9e22-362bd4238e7b',
    idItem: 'AM02',
    nama: 'Hair Shampoo',
    jumlah: 20,
  },
  {
    id: '59e5f878-3fa7-4fca-ae49-9cb94e0da0d9',
    idItem: 'AM13',
    nama: 'Laundry Bag',
    jumlah: 8,
  },
  {
    id: '6bf11ee3-0314-4859-8c47-8bad966cca1d',
    idItem: 'AM04',
    nama: 'Tooth Brush',
    jumlah: 23,
  },
  {
    id: '7136817d-3eed-4f2d-8a34-1b141219fd74',
    idItem: 'AM03',
    nama: 'Bath Foam',
    jumlah: 15,
  },
  {
    id: '8619fe8e-53aa-4d0f-91fc-785986006f77',
    idItem: 'AM07',
    nama: 'Toilet Paper',
    jumlah: 14,
  },
  {
    id: '90d2a12a-f1a2-4c1c-8eda-c1dbbadc64e3',
    idItem: 'AM11',
    nama: 'Slipper',
    jumlah: 20,
  },
  {
    id: 'c8b70b3f-ab83-4506-9ad9-1a761f9bd5f5',
    idItem: 'AM10',
    nama: 'Aqua',
    jumlah: 40,
  },
  {
    id: 'da6905c1-5927-4d94-ade9-fad159f2ba65',
    idItem: 'AM01',
    nama: 'Bath Soap',
    jumlah: 30,
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
