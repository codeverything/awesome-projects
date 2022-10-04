const SequeliceSeed = require('helpers/SequeliceSeed')

const tableName = 'Linens'
const data = [
  {
    id: '5a6e9952-e65a-407f-ac6c-f6e8694849ab',
    createdAt: '2020-06-23 10:07:15',
    updatedAt: '2020-06-23 10:29:36',
    idItem: 'LN04',
    nama: 'Bath Towel (Handuk Mandi)',
    jumlah: 50,
  },
  {
    id: '931b7cd6-fe50-44fd-833f-60e41b87537f',
    createdAt: '2020-06-23 10:10:27',
    updatedAt: '2020-06-23 10:29:52',
    idItem: 'LN06',
    nama: 'Bath Mat (Handuk Kamar Mandi)',
    jumlah: 25,
  },
  {
    id: '9559ad9f-a5af-4bad-ac5f-747f3b8dea0a',
    createdAt: '2020-06-23 10:01:46',
    updatedAt: '2020-06-23 10:29:05',
    idItem: 'LN01',
    nama: 'Bad Sheet Twin (Seprei Kamar Twin)',
    jumlah: 20,
  },
  {
    id: 'ad811fc7-02b7-450d-8264-97b9a89aca1c',
    createdAt: '2020-06-23 10:08:51',
    updatedAt: '2020-06-23 10:29:44',
    idItem: 'LN05',
    nama: 'Hand Towel (Handuk Tangan)',
    jumlah: 30,
  },
  {
    id: 'ae0edd64-dd05-488a-a791-ba45829bacfd',
    createdAt: '2020-06-23 10:28:25',
    updatedAt: '2020-06-23 10:28:25',
    idItem: 'LN07',
    nama: 'Duffe (Selimut Tebal)',
    jumlah: 40,
  },
  {
    id: 'b09ff228-c77a-4656-9733-10ae1a84fa7c',
    createdAt: '2020-06-23 10:02:06',
    updatedAt: '2020-06-23 10:29:15',
    idItem: 'LN02',
    nama: 'Bad Sheet Double (Seprei Kamar Double)',
    jumlah: 20,
  },
  {
    id: 'b21cd423-9020-4080-ac90-5954563ca1fa',
    createdAt: '2020-06-23 10:28:55',
    updatedAt: '2020-06-23 10:28:55',
    idItem: 'LN08',
    nama: 'Pillow (Bantal)',
    jumlah: 30,
  },
  {
    id: 'e95d4aa7-c1bb-436a-a4e1-503d9e457da9',
    createdAt: '2020-06-23 10:02:32',
    updatedAt: '2020-06-23 10:29:24',
    idItem: 'LN03',
    nama: 'Pillow Chase (Sarung Bantal)',
    jumlah: 40,
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
