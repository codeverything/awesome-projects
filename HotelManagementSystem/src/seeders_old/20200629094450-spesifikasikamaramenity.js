const SequeliceSeed = require('helpers/SequeliceSeed')

const tableName = 'SpesifikasiKamarAmenities'
const data = [
  {
    id: '0359cbef-dc52-41cc-9b42-738550338479',
    AmenityId: '90d2a12a-f1a2-4c1c-8eda-c1dbbadc64e3',
    SpesifikasiKamarId: '6da592d6-4de8-43a5-a45a-49039612857d',
    jumlah: 2,
  },
  {
    id: '0da4e1cf-e6d1-4857-b815-bf55a8fc6b61',
    AmenityId: '90d2a12a-f1a2-4c1c-8eda-c1dbbadc64e3',
    SpesifikasiKamarId: '6da592d6-4de8-43a5-a45a-49039612857d',
    jumlah: 2,
  },
  {
    id: '2d2a5c09-5c81-4840-af20-42ef23191f86',
    AmenityId: '1e3baff2-6f9b-4dd5-9961-fb6a4c7060fc',
    SpesifikasiKamarId: '6da592d6-4de8-43a5-a45a-49039612857d',
    jumlah: 2,
  },
  {
    id: '2e67b8d4-527a-46d1-8fdb-36eb05a7b331',
    AmenityId: '1e3baff2-6f9b-4dd5-9961-fb6a4c7060fc',
    SpesifikasiKamarId: '6da592d6-4de8-43a5-a45a-49039612857d',
    jumlah: 1,
  },
  {
    id: '367f0596-cce4-425c-8ac0-355f7c06b9c6',
    AmenityId: '6bf11ee3-0314-4859-8c47-8bad966cca1d',
    SpesifikasiKamarId: '6da592d6-4de8-43a5-a45a-49039612857d',
    jumlah: 2,
  },
  {
    id: '3865a9e3-3d9a-445c-b110-ec09fa613fde',
    AmenityId: '466c9d14-dced-4bb9-8675-1ece0a5a1573',
    SpesifikasiKamarId: '19364eed-dc07-4e67-a570-c824e0b56f62',
    jumlah: 1,
  },
  {
    id: '3c6e4f66-bc6e-4f7a-9548-62366ce95f0a',
    AmenityId: '8619fe8e-53aa-4d0f-91fc-785986006f77',
    SpesifikasiKamarId: 'aa6ca790-b7aa-45ad-8a0b-124f4d7793d8',
    jumlah: 1,
  },
  {
    id: '439bb334-a134-4792-8ce3-697a1424bb9c',
    AmenityId: 'c8b70b3f-ab83-4506-9ad9-1a761f9bd5f5',
    SpesifikasiKamarId: 'aa6ca790-b7aa-45ad-8a0b-124f4d7793d8',
    jumlah: 2,
  },
  {
    id: '5d774542-c96c-4469-9bf6-382a10e84abe',
    AmenityId: '6bf11ee3-0314-4859-8c47-8bad966cca1d',
    SpesifikasiKamarId: '19364eed-dc07-4e67-a570-c824e0b56f62',
    jumlah: 2,
  },
  {
    id: '5f59866e-d922-4557-8881-a775797c99ec',
    AmenityId: '8619fe8e-53aa-4d0f-91fc-785986006f77',
    SpesifikasiKamarId: '19364eed-dc07-4e67-a570-c824e0b56f62',
    jumlah: 1,
  },
  {
    id: '70749bcd-3dc3-4e99-8f5f-a076a46d6245',
    AmenityId: '8619fe8e-53aa-4d0f-91fc-785986006f77',
    SpesifikasiKamarId: '2794f2f1-247c-46d6-accc-c9515d5e1449',
    jumlah: 1,
  },
  {
    id: '8106f686-45fa-4ddb-a219-c7eb6d9f9233',
    AmenityId: '1e3baff2-6f9b-4dd5-9961-fb6a4c7060fc',
    SpesifikasiKamarId: '72e23ced-9e4f-48e3-bb07-6ca64c669e03',
    jumlah: 1,
  },
  {
    id: '84e017ff-8136-4c42-aa74-960024005fd8',
    AmenityId: 'c8b70b3f-ab83-4506-9ad9-1a761f9bd5f5',
    SpesifikasiKamarId: '19364eed-dc07-4e67-a570-c824e0b56f62',
    jumlah: 2,
  },
  {
    id: '86b1e24a-aaf8-401f-981d-26dd99fab419',
    AmenityId: 'c8b70b3f-ab83-4506-9ad9-1a761f9bd5f5',
    SpesifikasiKamarId: '2794f2f1-247c-46d6-accc-c9515d5e1449',
    jumlah: 2,
  },
  {
    id: '8de31445-81b2-4326-b63f-330255c8eb46',
    AmenityId: '2ce2e50a-013e-4407-85dd-6652520f8255',
    SpesifikasiKamarId: 'aa6ca790-b7aa-45ad-8a0b-124f4d7793d8',
    jumlah: 1,
  },
  {
    id: '986c6a40-d5a6-4a75-868d-7168cc60dc0d',
    AmenityId: '90d2a12a-f1a2-4c1c-8eda-c1dbbadc64e3',
    SpesifikasiKamarId: '19364eed-dc07-4e67-a570-c824e0b56f62',
    jumlah: 2,
  },
  {
    id: 'adf471e2-924e-4759-9268-d0c2c9676ac9',
    AmenityId: '2ce2e50a-013e-4407-85dd-6652520f8255',
    SpesifikasiKamarId: '19364eed-dc07-4e67-a570-c824e0b56f62',
    jumlah: 1,
  },
  {
    id: 'b317fcce-8bf2-47d0-90c5-d70d5f71dcf0',
    AmenityId: '31bbd781-a823-4c0a-bb6d-b5b347d1cbd8',
    SpesifikasiKamarId: '2794f2f1-247c-46d6-accc-c9515d5e1449',
    jumlah: 2,
  },
  {
    id: 'd0944b3a-7fe2-4e04-9a5e-3b292f825feb',
    AmenityId: '1e3baff2-6f9b-4dd5-9961-fb6a4c7060fc',
    SpesifikasiKamarId: '2794f2f1-247c-46d6-accc-c9515d5e1449',
    jumlah: 1,
  },
  {
    id: 'd225a75e-b638-4ea4-80cc-eb8deba12104',
    AmenityId: '6bf11ee3-0314-4859-8c47-8bad966cca1d',
    SpesifikasiKamarId: '2794f2f1-247c-46d6-accc-c9515d5e1449',
    jumlah: 2,
  },
  {
    id: 'd3dfa23c-42dc-46a5-bd49-09cb00fb9b13',
    AmenityId: '2ce2e50a-013e-4407-85dd-6652520f8255',
    SpesifikasiKamarId: '2794f2f1-247c-46d6-accc-c9515d5e1449',
    jumlah: 1,
  },
  {
    id: 'ded09d39-19a7-4020-845c-daaff180d551',
    AmenityId: '6bf11ee3-0314-4859-8c47-8bad966cca1d',
    SpesifikasiKamarId: 'aa6ca790-b7aa-45ad-8a0b-124f4d7793d8',
    jumlah: 2,
  },
  {
    id: 'ef7d7f01-9664-413d-ab4a-a6d42869ba0b',
    AmenityId: 'c8b70b3f-ab83-4506-9ad9-1a761f9bd5f5',
    SpesifikasiKamarId: '72e23ced-9e4f-48e3-bb07-6ca64c669e03',
    jumlah: 2,
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
