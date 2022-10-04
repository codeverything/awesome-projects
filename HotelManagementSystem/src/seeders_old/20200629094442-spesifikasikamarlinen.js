const SequeliceSeed = require('helpers/SequeliceSeed')

const tableName = 'SpesifikasiKamarLinens'
const data = [
  {
    id: '059e3feb-37ae-4651-9d82-95b34f89acc3',
    LinenId: '931b7cd6-fe50-44fd-833f-60e41b87537f',
    SpesifikasiKamarId: '6da592d6-4de8-43a5-a45a-49039612857d',
    jumlah: 1,
  },
  {
    id: '226ee3b6-ebe8-4863-b5a4-795dcb14592f',
    LinenId: 'ad811fc7-02b7-450d-8264-97b9a89aca1c',
    SpesifikasiKamarId: '6da592d6-4de8-43a5-a45a-49039612857d',
    jumlah: 1,
  },
  {
    id: '3a9bc657-dedb-49bc-ba8d-dcca094dab44',
    LinenId: 'e95d4aa7-c1bb-436a-a4e1-503d9e457da9',
    SpesifikasiKamarId: '6da592d6-4de8-43a5-a45a-49039612857d',
    jumlah: 2,
  },
  {
    id: '424b5a99-a18a-4185-ae88-8aee2183e417',
    LinenId: 'b09ff228-c77a-4656-9733-10ae1a84fa7c',
    SpesifikasiKamarId: '6da592d6-4de8-43a5-a45a-49039612857d',
    jumlah: 1,
  },
  {
    id: '5697a3b6-c113-4963-9a88-316efa27b806',
    LinenId: 'b21cd423-9020-4080-ac90-5954563ca1fa',
    SpesifikasiKamarId: '6da592d6-4de8-43a5-a45a-49039612857d',
    jumlah: 2,
  },
  {
    id: '5cbb65f2-01e2-49d2-8982-3fc6ae68de67',
    LinenId: 'b09ff228-c77a-4656-9733-10ae1a84fa7c',
    SpesifikasiKamarId: '72e23ced-9e4f-48e3-bb07-6ca64c669e03',
    jumlah: 1,
  },
  {
    id: '645e0e0f-a986-4244-b7af-54ba8e286834',
    LinenId: 'ad811fc7-02b7-450d-8264-97b9a89aca1c',
    SpesifikasiKamarId: 'aa6ca790-b7aa-45ad-8a0b-124f4d7793d8',
    jumlah: 1,
  },
  {
    id: '6bc80c9b-1c54-4a93-85e7-36f561fdeb3a',
    LinenId: '5a6e9952-e65a-407f-ac6c-f6e8694849ab',
    SpesifikasiKamarId: '19364eed-dc07-4e67-a570-c824e0b56f62',
    jumlah: 2,
  },
  {
    id: '72daf854-4087-48cf-b792-769eff20fd27',
    LinenId: 'e95d4aa7-c1bb-436a-a4e1-503d9e457da9',
    SpesifikasiKamarId: '72e23ced-9e4f-48e3-bb07-6ca64c669e03',
    jumlah: 2,
  },
  {
    id: '808c8c10-88d1-4fea-abe7-3d97d5a97c32',
    LinenId: 'ae0edd64-dd05-488a-a791-ba45829bacfd',
    SpesifikasiKamarId: '19364eed-dc07-4e67-a570-c824e0b56f62',
    jumlah: 1,
  },
  {
    id: '8ec67e23-1332-49a8-a577-95b60a44df4c',
    LinenId: 'e95d4aa7-c1bb-436a-a4e1-503d9e457da9',
    SpesifikasiKamarId: 'aa6ca790-b7aa-45ad-8a0b-124f4d7793d8',
    jumlah: 2,
  },
  {
    id: '959573b2-8ab4-4e0c-ba80-565d9a9735ce',
    LinenId: 'e95d4aa7-c1bb-436a-a4e1-503d9e457da9',
    SpesifikasiKamarId: '19364eed-dc07-4e67-a570-c824e0b56f62',
    jumlah: 2,
  },
  {
    id: '969cbf84-03a8-40d4-b783-40c9b473a348',
    LinenId: 'b21cd423-9020-4080-ac90-5954563ca1fa',
    SpesifikasiKamarId: '19364eed-dc07-4e67-a570-c824e0b56f62',
    jumlah: 2,
  },
  {
    id: '9f68497f-7784-46cb-8fb3-07dcee1d205a',
    LinenId: '931b7cd6-fe50-44fd-833f-60e41b87537f',
    SpesifikasiKamarId: '19364eed-dc07-4e67-a570-c824e0b56f62',
    jumlah: 2,
  },
  {
    id: 'a032a62e-8c0e-4d3d-8e37-9354bcbffd3d',
    LinenId: 'b21cd423-9020-4080-ac90-5954563ca1fa',
    SpesifikasiKamarId: '72e23ced-9e4f-48e3-bb07-6ca64c669e03',
    jumlah: 2,
  },
  {
    id: 'ab11e1cf-5c74-44b2-bce2-6af9586359fd',
    LinenId: 'ad811fc7-02b7-450d-8264-97b9a89aca1c',
    SpesifikasiKamarId: '2794f2f1-247c-46d6-accc-c9515d5e1449',
    jumlah: 1,
  },
  {
    id: 'b0080651-dfa7-485a-bce3-b0170582a30c',
    LinenId: '5a6e9952-e65a-407f-ac6c-f6e8694849ab',
    SpesifikasiKamarId: 'aa6ca790-b7aa-45ad-8a0b-124f4d7793d8',
    jumlah: 2,
  },
  {
    id: 'be6a4aab-a81a-4ae7-88c7-895418250eb3',
    LinenId: '9559ad9f-a5af-4bad-ac5f-747f3b8dea0a',
    SpesifikasiKamarId: 'aa6ca790-b7aa-45ad-8a0b-124f4d7793d8',
    jumlah: 1,
  },
  {
    id: 'c6687a48-5aa8-4abf-999e-114a6beb7bbb',
    LinenId: '5a6e9952-e65a-407f-ac6c-f6e8694849ab',
    SpesifikasiKamarId: '72e23ced-9e4f-48e3-bb07-6ca64c669e03',
    jumlah: 2,
  },
  {
    id: 'd1106a51-d534-4778-b065-32b60d0b05d7',
    LinenId: '5a6e9952-e65a-407f-ac6c-f6e8694849ab',
    SpesifikasiKamarId: '2794f2f1-247c-46d6-accc-c9515d5e1449',
    jumlah: 2,
  },
  {
    id: 'd3117a3c-cd5d-4419-8649-f7c8b5ad4968',
    LinenId: 'ae0edd64-dd05-488a-a791-ba45829bacfd',
    SpesifikasiKamarId: '72e23ced-9e4f-48e3-bb07-6ca64c669e03',
    jumlah: 1,
  },
  {
    id: 'e1805df3-b559-4ef3-ad75-2a28d3b512da',
    LinenId: '931b7cd6-fe50-44fd-833f-60e41b87537f',
    SpesifikasiKamarId: '2794f2f1-247c-46d6-accc-c9515d5e1449',
    jumlah: 1,
  },
  {
    id: 'ef97f5e7-c924-407d-9cf8-8b96fbc85069',
    LinenId: 'ae0edd64-dd05-488a-a791-ba45829bacfd',
    SpesifikasiKamarId: '2794f2f1-247c-46d6-accc-c9515d5e1449',
    jumlah: 1,
  },
  {
    id: 'fbb3af36-a77a-4629-be62-fc21ff6aedb2',
    LinenId: 'b21cd423-9020-4080-ac90-5954563ca1fa',
    SpesifikasiKamarId: '2794f2f1-247c-46d6-accc-c9515d5e1449',
    jumlah: 2,
  },
  {
    id: 'feb2d81c-76d9-4464-95a2-d076e10d3d02',
    LinenId: 'ae0edd64-dd05-488a-a791-ba45829bacfd',
    SpesifikasiKamarId: 'aa6ca790-b7aa-45ad-8a0b-124f4d7793d8',
    jumlah: 1,
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
