import { ConstMasterHakAkses } from 'constants/index'

export default class TemplateService {
  public static getTemplate() {
    return [
      {
        id: ConstMasterHakAkses.FRONTOFFICE,
        nama: 'Front Office',
        checked: false,
        path: '/front-office',
        defaultPage: false,
        listRoute: [
          {
            id: ConstMasterHakAkses.HOME,
            nama: 'Home',
            checked: false,
            path: '/front-office',
            listRoute: [
              {
                id: ConstMasterHakAkses.EXPORT_EXCELL,
                nama: 'Export to Excel',
                checked: false,
              },
            ],
          },
          {
            id: ConstMasterHakAkses.RESERVASI,
            nama: 'Reservasi',
            checked: false,
            path: '/front-office/reservasi',
            listRoute: [
              {
                id: ConstMasterHakAkses.ADD_PERORANGAN,
                nama: 'Add Perorangan',
                checked: false,
              },
              {
                id: ConstMasterHakAkses.ADD_CORPORATE,
                nama: 'Add Corporate',
                checked: false,
              },
              {
                id: ConstMasterHakAkses.DETAIL_RESERVASI,
                nama: 'Detail Reservasi',
                checked: false,
                listRoute: [
                  {
                    id: ConstMasterHakAkses.RESERVASI_CHECKIN,
                    nama: 'Check In',
                    checked: false,
                  },
                  {
                    id: ConstMasterHakAkses.BATAL_RESERVASI,
                    nama: 'Batal Reservasi',
                    checked: false,
                  },
                ],
              },
            ],
          },
          {
            id: ConstMasterHakAkses.CHECKIN_CHECKOUT,
            nama: 'Check-In/Check-Out',
            checked: false,
            path: '/front-office/check-in-out',
            listRoute: [
              {
                id: ConstMasterHakAkses.DETAIL_CHECKIN_CHECKOUT,
                nama: 'Detail Check In And Out',
                checked: false,
                listRoute: [
                  {
                    id: ConstMasterHakAkses.CHECK_KAMAR,
                    nama: 'Check Kamar',
                    checked: false,
                  },
                  {
                    id: ConstMasterHakAkses.EXTEND_KAMAR,
                    nama: 'Extend Kamar',
                    checked: false,
                  },
                ],
              },
            ],
          },
          {
            id: ConstMasterHakAkses.LIST_INVOICE,
            nama: 'Invoice',
            checked: false,
            path: '/front-office/invoice',
            listRoute: [
              {
                id: ConstMasterHakAkses.DETAIL_INVOICE,
                nama: 'Detail Invoice',
                checked: false,
                listRoute: [
                  {
                    id: ConstMasterHakAkses.AKSES_TAMBAHKAN,
                    nama: 'Akses Tambahkan',
                    checked: false,
                  },
                  {
                    id: ConstMasterHakAkses.SELESAI_INVOICE,
                    nama: 'Selesai Invoice',
                    checked: false,
                  },
                ],
              },
            ],
          },
          {
            id: ConstMasterHakAkses.RESERVASI_LIST_LOST_AND_FOUND,
            nama: 'Lost & Found',
            checked: false,
            path: '/front-office/log-lost-found',
            listRoute: [
              {
                id: ConstMasterHakAkses.RESERVASI_AMBIL_LOST_AND_FOUND,
                nama: 'Ambil Lost & Found',
                checked: false,
              },
              {
                id: ConstMasterHakAkses.RESERVASI_DETAIL_LOST_AND_FOUND,
                nama: 'Detail Lost & Found',
                checked: false,
              },
            ],
          },
        ],
      },
      {
        id: ConstMasterHakAkses.HOUSEKEEPING,
        nama: 'House Keeping',
        checked: false,
        path: '/house-keeping',
        defaultPage: false,
        listRoute: [
          {
            id: ConstMasterHakAkses.ROOM,
            nama: 'Room',
            checked: false,
            path: '/house-keeping',
            listRoute: [
              {
                id: ConstMasterHakAkses.DETAIL_ROOM,
                nama: 'Detail Room',
                checked: false,
                listRoute: [
                  {
                    id: ConstMasterHakAkses.DETAIL_ROOM_CHECKER,
                    nama: 'Checker',
                    checked: false,
                  },
                  {
                    id: ConstMasterHakAkses.UPDATE_STATUS_KAMAR,
                    nama: 'Update Status Kamar',
                    checked: false,
                  },
                  {
                    id: ConstMasterHakAkses.DETAIL_ROOM_LINEN,
                    nama: 'Linen',
                    checked: false,
                    listRoute: [
                      {
                        id: ConstMasterHakAkses.UBAH_LINEN,
                        nama: 'Ubah Linen',
                        checked: false,
                      },
                      {
                        id: ConstMasterHakAkses.LOG_LINEN,
                        nama: 'Log Linen',
                        checked: false,
                      },
                    ],
                  },
                  {
                    id: ConstMasterHakAkses.DETAIL_ROOM_AMENITIES,
                    nama: 'Amenities',
                    checked: false,
                    listRoute: [
                      {
                        id: ConstMasterHakAkses.TAMBAH_ROOM_AMENITIES,
                        nama: 'Tambah Amenities',
                        checked: false,
                      },
                      {
                        id: ConstMasterHakAkses.EDIT_ROOM_AMENITIES,
                        nama: 'Edit Amenities',
                        checked: false,
                      },
                      {
                        id: ConstMasterHakAkses.DELETE_ROOM_AMENITIES,
                        nama: 'Delete Amenities',
                        checked: false,
                      },
                    ],
                  },
                  {
                    id: ConstMasterHakAkses.DETAIL_ROOM_LOST_AND_FOUND,
                    nama: 'Lost & Found',
                    checked: false,
                    listRoute: [
                      {
                        id: ConstMasterHakAkses.TAMBAH_ROOM_BARANG_LOST,
                        nama: 'Tambah Barang',
                        checked: false,
                      },
                      {
                        id: ConstMasterHakAkses.EDIT_ROOM_BARANG_LOST,
                        nama: 'Edit Barang',
                        checked: false,
                      },
                      {
                        id: ConstMasterHakAkses.DELETE_ROOM_BARANG_LOST,
                        nama: 'Delete Barang',
                        checked: false,
                      },
                    ],
                  },
                ],
              },
              {
                id: ConstMasterHakAkses.CHECK_ROOM,
                nama: 'Check Room',
                checked: false,
              },
              {
                id: ConstMasterHakAkses.LOG_ROOM,
                nama: 'Log Room',
                checked: false,
              },
            ],
          },
          {
            id: ConstMasterHakAkses.LINEN,
            nama: 'Linen',
            checked: false,
            path: '/house-keeping/linen',
            listRoute: [
              {
                id: ConstMasterHakAkses.DETAIL_LINEN,
                nama: 'Detail Linen',
                checked: false,
              },
              {
                id: ConstMasterHakAkses.UPDATE_LINEN,
                nama: 'Update Linen',
                checked: false,
              },
              {
                id: ConstMasterHakAkses.LAUNDRY_LINEN,
                nama: 'Laundry Linen',
                checked: false,
              },
            ],
          },
          {
            id: ConstMasterHakAkses.AMENITIES,
            nama: 'Amenities',
            checked: false,
            path: '/house-keeping/amenities',
            listRoute: [
              {
                id: ConstMasterHakAkses.DETAIL_AMENITY,
                nama: 'Detail Amenities',
                checked: false,
              },
              {
                id: ConstMasterHakAkses.UPDATE_AMENITY,
                nama: 'Update Amenities',
                checked: false,
              },
            ],
          },
          {
            id: ConstMasterHakAkses.LOG_LAUNDRY,
            nama: 'Log Laundry',
            checked: false,
            path: '/house-keeping/log-laundry',
          },
          {
            id: ConstMasterHakAkses.LOG_INVENTORY,
            nama: 'Log Inventory',
            checked: false,
            path: '/house-keeping/log-inventory',
          },
          {
            id: ConstMasterHakAkses.HK_LIST_LOST_AND_FOUND,
            nama: 'Lost & Found',
            checked: false,
            path: '/house-keeping/log-lost-found',
            listRoute: [
              {
                id: ConstMasterHakAkses.HK_AMBIL_LOST_AND_FOUND,
                nama: 'Ambil Lost & Found',
                checked: false,
              },
              {
                id: ConstMasterHakAkses.HK_DETAIL_LOST_AND_FOUND,
                nama: 'Detail Lost & Found',
                checked: false,
              },
            ],
          },
        ],
      },
      {
        id: ConstMasterHakAkses.ADMINISTRATION,
        nama: 'Administration',
        checked: false,
        path: '/administration',
        defaultPage: false,
      },
      // {
      //   id: ConstMasterHakAkses.FUNCTIONAL,
      //   nama: 'Functional Room',
      //   checked: false,
      //   path: '/functional-room',
      //   defaultPage: false,
      // },
      // {
      //   id: ConstMasterHakAkses.FINANCE,
      //   nama: 'Finance',
      //   checked: false,
      //   path: '/finance',
      //   defaultPage: false,
      // },
    ]
  }
}
