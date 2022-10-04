const SequeliceSeed = require('helpers/SequeliceSeed')

const tableName = 'LogHargaDefaultSpesifikasiKamars'
const data = [
  {
    id: '37f0dc79-8faf-4e61-a040-a8f46ff2186c',
    createdAt: '2020-06-23 11:10:08',
    updatedAt: '2020-06-23 11:10:08',
    SpesifikasiKamarId: '2794f2f1-247c-46d6-accc-c9515d5e1449',
    harga: 338520,
  },
  {
    id: '650de9c5-8749-417b-aaab-82e8ebce7947',
    createdAt: '2020-06-23 15:11:10',
    updatedAt: '2020-06-23 15:11:10',
    SpesifikasiKamarId: '6da592d6-4de8-43a5-a45a-49039612857d',
    harga: 300000,
  },
  {
    id: '71ceef73-6b96-477a-a062-fdbb8f0d19eb',
    createdAt: '2020-06-23 12:06:48',
    updatedAt: '2020-06-23 12:06:48',
    SpesifikasiKamarId: '72e23ced-9e4f-48e3-bb07-6ca64c669e03',
    harga: 300000,
  },
  {
    id: '8696f979-2352-441e-9e1a-2cf24f89241f',
    createdAt: '2020-06-23 09:55:35',
    updatedAt: '2020-06-23 09:55:35',
    SpesifikasiKamarId: '19364eed-dc07-4e67-a570-c824e0b56f62',
    harga: 263417,
  },
  {
    id: '87fa23d4-3275-41d5-bd32-b857a68dfdcf',
    createdAt: '2020-06-23 15:01:57',
    updatedAt: '2020-06-23 15:01:57',
    SpesifikasiKamarId: '9ea2cd96-6e7a-43c8-8ef1-f38adaaa1f13',
    harga: 200000,
  },
  {
    id: 'fdf829bf-86e5-45ce-b86d-2c4851e911ef',
    createdAt: '2020-06-23 11:19:46',
    updatedAt: '2020-06-23 11:19:46',
    SpesifikasiKamarId: 'aa6ca790-b7aa-45ad-8a0b-124f4d7793d8',
    harga: 300000,
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
