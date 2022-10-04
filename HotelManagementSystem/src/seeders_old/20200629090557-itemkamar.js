const SequeliceSeed = require('helpers/SequeliceSeed')

const tableName = 'ItemKamars'
const data = [
  {
    id: '067007b5-a19b-473f-928b-4557c301ee0f',
    nama: 'AC Remote (Remot AC)',
  },
  {
    id: '0d746117-c989-4328-adcc-d34f8c02e1a4',
    nama: 'Standing Mirror (Cermin Tegak/dinding)',
  },
  {
    id: '0dd2b107-a4f1-402b-b0cc-e093d9fb50e2',
    nama: 'Handle Shower ',
  },
  {
    id: '175a7d0b-fe45-4304-b31b-a8d68a142ee4',
    nama: 'Window Glass (Kaca Jendela)',
  },
  {
    id: '19fe72d5-dc6d-426e-af0f-08f7714bf18c',
    nama: 'Standing Toilet Glass (Kaca Tegak Kamar Mandi)',
  },
  {
    id: '1af66440-02f5-4cf8-bf9b-bff8eedb6e94',
    nama: 'Juice Glass (Gelas Jus)',
  },
  {
    id: '1d1cc0ab-4136-48e9-9321-c1721f0f1ff6',
    nama: 'Sauser Cup (Alas Cangkir/Piring Kecil)',
  },
  {
    id: '1ebf85a7-ff6e-43ca-b63e-7e3e97cad3f3',
    nama: 'Hot Jug (Pemanas Air)',
  },
  {
    id: '36a10de6-49da-403d-8e32-23f631291eaa',
    nama: 'Kran Air Wastafel',
  },
  {
    id: '41bce92a-e946-4a8c-a1ac-de7adc954bdf',
    nama: 'Hanger (Gantungan Baju)',
  },
  {
    id: '470ed585-84f1-412b-9f44-69f262e23aee',
    nama: 'Tray Glass Soap (Kaca Alas Tempat Sabun)',
  },
  {
    id: '4822abad-d102-4ba9-b183-d8d5358df39e',
    nama: 'Ashtray (Asbak)',
  },
  { id: '4be81b42-4669-4e47-b35e-cb237fe1e389', nama: 'Water Heater' },
  {
    id: '52b7720d-78e1-4df4-8034-48e8a7248173',
    nama: 'Dry Basket (Tempat Sampah Kering)',
  },
  { id: '6c8c08d5-2e99-42e5-92bc-af7189382904', nama: 'Hair Dryer' },
  {
    id: '6f93ce70-418e-483a-8e9d-7a9746395350',
    nama: 'Painting (Lukisan)',
  },
  {
    id: '77578a85-de8c-46bd-aaf8-51c5539dfd73',
    nama: 'Wet Basket (Tempat Sampah Basah)',
  },
  {
    id: '8d46ba6f-4564-4601-8bd2-3c2eac6a110a',
    nama: 'Sugar Bowl (Tempat Gula)',
  },
  {
    id: '905119c2-5f52-49ee-b171-be74195cd1b8',
    nama: 'Decorder Televisi',
  },
  {
    id: '91997fb5-1d6c-406c-bc80-47174aff6b03',
    nama: 'Sunblind (Gorden Jendela)',
  },
  {
    id: 'a1f785f8-89d5-4cf4-9d01-c0b051f80f39',
    nama: 'Television Remote (Remot Televisi)',
  },
  { id: 'a2fa7326-4730-4afd-ae2a-1844da45d394', nama: 'AC' },
  {
    id: 'ac67b3a7-2707-4d0e-9e0f-fa8ed2e4cee8',
    nama: 'Television (Televisi)',
  },
  {
    id: 'b51896cb-8db1-4b36-ae25-bedb2533bafe',
    nama: 'Toilet Mirror (Cermin Kamar Mandi)',
  },
  { id: 'b53678c9-dc7a-4915-97b5-77dba2ef92c2', nama: 'Cup (Cangkir)' },
  {
    id: 'b69baa87-2f63-48bf-89e2-c142788907c6',
    nama: 'Towel Rack (Gantungan Handuk)',
  },
  {
    id: 'c1b19d3f-10c0-4b6d-a8a5-674479be2c2d',
    nama: 'Tray Juice Glass (Alas Tempat Gelas Jus)',
  },
  { id: 'c8ee1d0b-d4d9-4bcc-877b-f955a920c530', nama: 'Chair (Kursi)' },
  {
    id: 'd0a27cc3-7120-44b4-bf3e-f8b1d83ddf5c',
    nama: 'Tea Spoon (Sendok Tea/Sendok Kecil)',
  },
  { id: 'ec40dab7-a305-44c2-8920-d4965ff44525', nama: 'Table (Meja)' },
]

module.exports = SequeliceSeed.createSeedData(tableName, data)
