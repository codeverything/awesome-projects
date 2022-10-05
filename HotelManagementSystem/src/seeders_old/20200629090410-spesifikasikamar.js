const SequeliceSeed = require('helpers/SequeliceSeed')

const tableName = 'SpesifikasiKamars'
const data = [
  {
    id: '19364eed-dc07-4e67-a570-c824e0b56f62',
    createdAt: '2020-06-23 09:55:35',
    updatedAt: '2020-06-23 11:08:54',
    nama: 'Kamar Superior (Superior Room)',
    MasterTipeKamarId: 'd15e45bf-d0db-408e-931b-0f3a886a4166',
    MasterTipeKasurId: '9ea7776b-9ab3-4d1b-920c-5d2206c7f38c',
    MasterSpecialRequirementId: 'eb3a3305-3995-449b-8d28-58cbbe012122',
    maxTamu: 2,
  },
  {
    id: '2794f2f1-247c-46d6-accc-c9515d5e1449',
    createdAt: '2020-06-23 11:10:08',
    updatedAt: '2020-06-23 11:10:08',
    nama: 'Kamar Deluxe (Deluxe Room)',
    MasterTipeKamarId: 'd0bc77f8-180a-46d5-bdc5-5405cac2735f',
    MasterTipeKasurId: '140824d7-b9b2-496d-afbc-049f01fd63da',
    MasterSpecialRequirementId: 'eb3a3305-3995-449b-8d28-58cbbe012122',
    maxTamu: 2,
  },
  {
    id: '6da592d6-4de8-43a5-a45a-49039612857d',
    createdAt: '2020-04-14 23:07:41',
    updatedAt: '2020-06-23 15:11:10',
    nama: 'Standar - Double - No Smoking',
    MasterTipeKamarId: 'c016e6b4-278d-451e-a11b-56d5bceb6054',
    MasterTipeKasurId: '140824d7-b9b2-496d-afbc-049f01fd63da',
    MasterSpecialRequirementId: 'eb3a3305-3995-449b-8d28-58cbbe012122',
    maxTamu: 2,
  },
  {
    id: '72e23ced-9e4f-48e3-bb07-6ca64c669e03',
    createdAt: '2020-06-23 12:06:48',
    updatedAt: '2020-06-23 12:06:48',
    nama: 'Superior Room Double',
    MasterTipeKamarId: 'd15e45bf-d0db-408e-931b-0f3a886a4166',
    MasterTipeKasurId: '140824d7-b9b2-496d-afbc-049f01fd63da',
    MasterSpecialRequirementId: 'eb3a3305-3995-449b-8d28-58cbbe012122',
    maxTamu: 2,
  },
  {
    id: '9ea2cd96-6e7a-43c8-8ef1-f38adaaa1f13',
    createdAt: '2020-04-14 23:08:28',
    updatedAt: '2020-06-23 15:01:57',
    nama: 'Standar - Twin - No Smoking',
    MasterTipeKamarId: 'c016e6b4-278d-451e-a11b-56d5bceb6054',
    MasterTipeKasurId: 'e28050de-156e-4482-b384-c235907e49ff',
    MasterSpecialRequirementId: 'eb3a3305-3995-449b-8d28-58cbbe012122',
    maxTamu: 2,
  },
  {
    id: 'aa6ca790-b7aa-45ad-8a0b-124f4d7793d8',
    createdAt: '2020-06-23 11:19:46',
    updatedAt: '2020-06-23 11:19:46',
    nama: 'Superior Room Twin',
    MasterTipeKamarId: 'd15e45bf-d0db-408e-931b-0f3a886a4166',
    MasterTipeKasurId: 'e28050de-156e-4482-b384-c235907e49ff',
    MasterSpecialRequirementId: 'eb3a3305-3995-449b-8d28-58cbbe012122',
    maxTamu: 2,
  },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
