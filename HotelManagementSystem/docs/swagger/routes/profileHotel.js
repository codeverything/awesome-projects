module.exports = {
  '/profile-hotel': {
    get: {
      tags: ['Profile Hotel'],
      security: [
        {
          auth_token: [],
        },
      ],
      responses: {
        200: {
          description: 'Reservasi Berhasil Dibatalkan',
        },
      },
    },
  },
  '/profile-hotel/{id}': {
    put: {
      tags: ['Profile Hotel'],
      summary: 'Profile Hotel',
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid',
          },
          description: 'Profile Hotel Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                profileHotel: {
                  type: 'string',
                  format: 'binary',
                },
                nama: {
                  type: 'string',
                },
                nomorTelepon: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                alamat: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Berhasil Check-In',
        },
      },
    },
  },
  '/pilih-kamar/{id}': {
    post: {
      tags: ['Reservasi'],
      summary: 'Pilih Reservasi yang akan memilih kamar',
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid',
          },
          description: 'Profile Hotel Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                KamarId: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Berhasil Check-In',
        },
      },
    },
  },
  '/check-kamar/{id}': {
    post: {
      tags: ['Profile Hotel'],
      summary: 'Pilih Profile Hotel yang akan Di Check',
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid',
          },
          description: 'Profile Hotel Id',
        },
      ],
      responses: {
        200: {
          desccription: 'Profile Hotel Berhasil Di Cek',
        },
      },
    },
  },
  '/reservasi-checkin-checkout': {
    get: {
      tags: ['Reservasi'],
      summary: 'Get All Reservasi',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          $ref: '#/components/parameters/page',
        },
        {
          $ref: '#/components/parameters/pageSize',
        },
        {
          $ref: '#/components/parameters/filtered',
        },
        {
          $ref: '#/components/parameters/sorted',
        },
      ],
      responses: {
        200: {
          description: 'Get All Reservasi By Check In Check Out ',
        },
      },
    },
  },
  '/reservasi-reserved': {
    get: {
      tags: ['Reservasi'],
      summary: 'Get All Reservasi',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          $ref: '#/components/parameters/page',
        },
        {
          $ref: '#/components/parameters/pageSize',
        },
        {
          $ref: '#/components/parameters/filtered',
        },
        {
          $ref: '#/components/parameters/sorted',
        },
      ],
      responses: {
        200: {
          description: 'Get All Reservasi By Check In Check Out ',
        },
      },
    },
  },

  '/reservasi': {
    get: {
      tags: ['Reservasi'],
      summary: 'Get All Reservasi',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          $ref: '#/components/parameters/page',
        },
        {
          $ref: '#/components/parameters/pageSize',
        },
        {
          $ref: '#/components/parameters/filtered',
        },
        {
          $ref: '#/components/parameters/sorted',
        },
      ],
      responses: {
        200: {
          description: 'Get All Reservasi',
        },
      },
    },
    post: {
      tags: ['Reservasi'],
      summary: 'Create New Reservasi',
      security: [
        {
          auth_token: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                MasterSourcePemesananId: {
                  type: 'string',
                  format: 'uuid',
                },
                InformasiOrangId: {
                  type: 'string',
                  format: 'uuid',
                },
                jumlahTamu: {
                  type: 'integer',
                },
                tanggalAwalCheckIn: {
                  type: 'full-date',
                },
                tanggalAkhirCheckOut: {
                  type: 'full-date',
                },
                MasterJenisJaminanId: {
                  type: 'string',
                  format: 'uuid',
                },
                MasterJenisPembayaranId: {
                  type: 'string',
                  format: 'uuid',
                },
                nomorIdentitas: {
                  type: 'string',
                },
                nilaiDeposit: {
                  type: 'integer',
                },
                MasterTipePromoId: {
                  type: 'string',
                  format: 'uuid',
                },
                nilaiPromo: {
                  type: 'integer',
                },
                kodeBooking: {
                  type: 'string',
                  format: 'uuid',
                },
                MasterOTAId: {
                  type: 'string',
                  format: 'uuid',
                },
                PerusahaanId: {
                  type: 'string',
                  format: 'uuid',
                },
                PromoId: {
                  type: 'string',
                  format: 'uuid',
                },
                totalPembayaran: {
                  type: 'integer',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Reservasi',
        },
      },
    },
  },
  '/reservasi/{id}': {
    get: {
      tags: ['Reservasi'],
      summary: 'Get Reservasi By Id',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
            format: 'uuid',
          },
          description: 'Reservasi Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Reservasi By Id',
        },
      },
    },
    put: {
      tags: ['Reservasi'],
      summary: 'Update Data Reservasi',
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Reservasi Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                nama: {
                  type: 'string',
                },
              },
              required: ['nama'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Update Data Reservasi',
        },
      },
    },
    delete: {
      tags: ['Reservasi'],
      summary: 'Delete Reservasi By Id',
      security: [
        {
          auth_token: [],
        },
      ],
      produces: ['application/json'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'Reservasi Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Reservasi By Id',
        },
      },
    },
  },
  '/reservasi/perorangan': {
    post: {
      tags: ['Reservasi'],
      summary: 'Create New Reservasi',
      security: [
        {
          auth_token: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                dataString: {
                  type: 'string',
                  description:
                    '{"Reservasi":{"MasterSourcePemesananId":"f5ffc769-5b11-443c-b093-6017ad2a95a4","downPayment":0,"jumlahTamu":1,"JenisPembayaranId":"3565568d-76c9-429c-997b-099d446d04a7"},"ReservasiKamars":[{"tanggalCheckIn":"2021-04-22T07:47:10.540Z","tanggalCheckOut":"2021-04-23T07:47:10.540Z","MasterSpecialRequirementId":"eb3a3305-3995-449b-8d28-58cbbe012122","MasterTipeKamarId":"c016e6b4-278d-451e-a11b-56d5bceb6054","MasterTipeKasurId":"140824d7-b9b2-496d-afbc-049f01fd63da","hargaKamar":300000,"totalHarga":300000}],"InformasiOrang":{"id":"0dffe67b-9528-469e-9a27-0fa01b001387","createdAt":"2021-03-08T06:56:45.000Z","updatedAt":"2021-03-08T07:44:42.000Z","nama":"Test ian","MasterTipeIdentitasId":"3c63406d-7cd3-44de-a696-a26d80430bf1","nomorIdentitas":12312321,"CityId":null,"tanggalLahir":null,"alamat":null,"MasterJenisKelaminId":null,"email":"sada@email.com","nomorHandphone":"123123123","MasterStatusPerkawinanId":null,"MasterAgamaId":null,"MasterKewarganegaraanId":null,"pekerjaan":null,"fileIdentitas":"/uploads/1615189482406-acosta.jpg","fileBuktiMenikah":"/uploads/1615186605195-beruk 1.jpg","MasterTipeTamuId":"fee5612d-9b37-4956-b05c-6c90326bd84f","jabatan":null,"deletedAt":null,"MasterTipeIdentitase":{"id":"3c63406d-7cd3-44de-a696-a26d80430bf1","createdAt":"1970-01-01T00:00:00.000Z","updatedAt":"1970-01-01T00:00:00.000Z","nama":"KTP"},"MasterAgama":null,"MasterJenisKelamin":null,"MasterKewarganegaraan":null,"MasterTipeTamu":{"id":"fee5612d-9b37-4956-b05c-6c90326bd84f","createdAt":"1970-01-01T00:00:00.000Z","updatedAt":"1970-01-01T00:00:00.000Z","nama":"Guest"},"MasterStatusPerkawinan":null,"City":null},"kamarAvailable":0,"hargaKamar":0}',
                },
                fileIdentitas: {
                  type: 'string',
                  format: 'binary',
                },
                fileBuktiMenikah: {
                  type: 'string',
                  format: 'binary',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Reservasi Informasi Tamu',
        },
      },
    },
  },
  '/reservasi/perusahaan': {
    post: {
      tags: ['Reservasi'],
      summary: 'Create New Reservasi',
      security: [
        {
          auth_token: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                dataString: {
                  type: 'string',
                  description: `example: {
                      "Reservasis": {
                          "MasterSourcePemesananId": "f5ffc769-5b11-443c-b093-6017ad2a95a4",
                          "downPayment": 0,
                          "jumlahTamu": 1,
                          "JenisPembayaranId": "3565568d-76c9-429c-997b-099d446d04a7"
                      },
                      "ReservasiKamars": [
                          {
                              "tanggalCheckIn": "2021-04-22T07:47:10.540Z",
                              "tanggalCheckOut": "2021-04-23T07:47:10.540Z",
                              "MasterSpecialRequirementId": "eb3a3305-3995-449b-8d28-58cbbe012122",
                              "MasterTipeKamarId": "c016e6b4-278d-451e-a11b-56d5bceb6054",
                              "MasterTipeKasurId": "140824d7-b9b2-496d-afbc-049f01fd63da",
                              "hargaKamar": 300000,
                              "totalHarga": 300000
                          }
                      ],
                      "Perusahaans": {
                          "id": "0dffe67b-9528-469e-9a27-0fa01b001387",
                          "nama": "PT. Maju Mundur",
                          "alamat": "JL. maju mundur",
                          "nomorHandphone": "123123123",
                          "email": "sada@email.com"
                      },
                      "InformasiOrangs": {
                          "id": "0dffe67b-9528-469e-9a27-0fa01b001387",
                          "createdAt": "2021-03-08T06:56:45.000Z",
                          "updatedAt": "2021-03-08T07:44:42.000Z",
                          "nama": "Test ian",
                          "MasterTipeIdentitasId": "3c63406d-7cd3-44de-a696-a26d80430bf1",
                          "nomorIdentitas": 12312321,
                          "CityId": null,
                          "tanggalLahir": null,
                          "alamat": null,
                          "MasterJenisKelaminId": null,
                          "email": "sada@email.com",
                          "nomorHandphone": "123123123",
                          "MasterStatusPerkawinanId": null,
                          "MasterAgamaId": null,
                          "MasterKewarganegaraanId": null,
                          "pekerjaan": null,
                          "fileIdentitas": "/uploads/1615189482406-acosta.jpg",
                          "fileBuktiMenikah": "/uploads/1615186605195-beruk 1.jpg",
                          "MasterTipeTamuId": "fee5612d-9b37-4956-b05c-6c90326bd84f",
                          "jabatan": null,
                          "deletedAt": null,
                          "MasterTipeIdentitase": {
                              "id": "3c63406d-7cd3-44de-a696-a26d80430bf1",
                              "createdAt": "1970-01-01T00:00:00.000Z",
                              "updatedAt": "1970-01-01T00:00:00.000Z",
                              "nama": "KTP"
                          },
                          "MasterAgama": null,
                          "MasterJenisKelamin": null,
                          "MasterKewarganegaraan": null,
                          "MasterTipeTamu": {
                              "id": "fee5612d-9b37-4956-b05c-6c90326bd84f",
                              "createdAt": "1970-01-01T00:00:00.000Z",
                              "updatedAt": "1970-01-01T00:00:00.000Z",
                              "nama": "Guest"
                          },
                          "MasterStatusPerkawinan": null,
                          "City": null
                      },
                      "kamarAvailable": 0,
                      "hargaKamar": 0
                  }`,
                },
                fileIdentitas: {
                  type: 'string',
                  format: 'binary',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Reservasi Perusahaan',
        },
      },
    },
  },
}
