module.exports = {
  '/all-reservasi-kamar/{reservasiId}': {
    get: {
      tags: ['Reservasi Kamar'],
      summary: 'Get All Reservasi Kamar',
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
        {
          in: 'path',
          name: 'reservasiId',
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
          description: 'Get All Reservasi Kamar',
        },
      },
    },
  },
  '/reservasi-kamar/{id}': {
    get: {
      tags: ['Reservasi Kamar'],
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
          description: 'Reservasi Kamar Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Reservasi Kamar By Id',
        },
      },
    },
    put: {
      tags: ['Reservasi Kamar'],
      summary: 'Update Data Reservasi Kamar',
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
          description: 'Reservasi Kamar Id',
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
          description: 'Update Data Reservasi Kamar',
        },
      },
    },
    delete: {
      tags: ['Reservasi Kamar'],
      summary: 'Delete Reservasi Kamar By Id',
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
          description: 'Reservasi Kamar Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Reservasi Kamar By Id',
        },
      },
    },
  },
  '/check-out/{id}': {
    post: {
      tags: ['Reservasi Kamar'],
      summary: 'CheckOut',
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
          description: 'Reservasi Kamar Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                MasterStatusHKId: {
                  type: 'string',
                  format: 'uuid',
                },
              },
              example: {
                MasterStatusHKId: '8ca99026-c315-438b-9a0e-720f78684a0b',
                checkOutKerusakan: [
                  {
                    ItemKamarId: '067007b5-a19b-473f-928b-4557c301ee0f',
                    jumlah: 2,
                    MasterStatusTagihanId:
                      'b6bee533-6ab9-4053-b023-999e91f15ca2',
                    MasterTagihanKerusakanKehilanganId:
                      '8178662c-2240-4a7c-a159-a6f6077c1e14',
                  },
                  {
                    ItemKamarId: '4822abad-d102-4ba9-b183-d8d5358df39e',
                    jumlah: 2,
                    MasterStatusTagihanId:
                      'b6bee533-6ab9-4053-b023-999e91f15ca2',
                    MasterTagihanKerusakanKehilanganId:
                      '8178662c-2240-4a7c-a159-a6f6077c1e14',
                  },
                ],
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Update Data Reservasi Kamar',
        },
      },
    },
  },
  '/swap-kamar/{id}': {
    put: {
      tags: ['Reservasi Kamar'],
      summary: 'CheckOut',
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
          description: 'Reservasi Kamar Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                MasterStatusHKId: {
                  type: 'string',
                  format: 'uuid',
                },
                KamarId: {
                  type: 'string',
                  format: 'uuid',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Update Data Reservasi Kamar',
        },
      },
    },
  },
  '/detail-check-kamar/{id}': {
    get: {
      tags: ['Reservasi Kamar'],
      summary: 'Detail CheckOut',
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
          description: 'Reservasi Kamar Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Data Detail CheckOut',
        },
      },
    },
  },
  '/kerusakan-kehilangan/{id}': {
    post: {
      tags: ['Reservasi Kamar'],
      summary: 'Tambah Kerusakan Kehilangan',
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
          description: 'Reservasi Kamar Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                MasterStatusHKId: {
                  type: 'string',
                  format: 'uuid',
                },
              },
              example: {
                itemKamar: [
                  {
                    ItemKamarId: '067007b5-a19b-473f-928b-4557c301ee0f',
                    jumlah: 2,
                    MasterStatusTagihanId:
                      'b6bee533-6ab9-4053-b023-999e91f15ca2',
                    MasterTagihanKerusakanKehilanganId:
                      '8178662c-2240-4a7c-a159-a6f6077c1e14',
                  },
                  {
                    ItemKamarId: '4822abad-d102-4ba9-b183-d8d5358df39e',
                    jumlah: 2,
                    MasterStatusTagihanId:
                      'b6bee533-6ab9-4053-b023-999e91f15ca2',
                    MasterTagihanKerusakanKehilanganId:
                      '8178662c-2240-4a7c-a159-a6f6077c1e14',
                  },
                ],
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Update Data Reservasi Kamar',
        },
      },
    },
  },
  '/check-in/{id}': {
    post: {
      tags: ['Reservasi Kamar'],
      summary: 'CheckIn',
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
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                KamarId: {
                  type: 'array',
                  items: {
                    type: 'string',
                    format: 'uuid',
                  },
                },
              },
              example: {
                MasterJenisJaminanId: '2e8d208f-d3f3-4254-9664-1ae4801bf5d3',
                nomorIdentitas: '',
                nilaiDeposit: 20000,
                tipeRoom: [
                  {
                    MasterStatusHK: {
                      id: '1d2dc580-af6e-4aed-a32b-f20c0b7d28e1',
                      nama: 'Available, Clean',
                    },
                    MasterStatusHKId: '1d2dc580-af6e-4aed-a32b-f20c0b7d28e1',
                    MasterStatusKamar: {
                      id: '0',
                      nama: 'Checked-out',
                    },
                    MasterStatusKamarId: '0',
                    SpesifikasiKamar: {
                      id: '9ea2cd96-6e7a-43c8-8ef1-f38adaaa1f13',
                      createdAt: '2020-04-14T23:08:28.000Z',
                      updatedAt: '2020-06-23T15:01:57.000Z',
                      nama: 'Standar - Twin - No Smoking',
                      MasterTipeKamarId: 'c016e6b4-278d-451e-a11b-56d5bceb6054',
                    },
                    SpesifikasiKamarId: '6da592d6-4de8-43a5-a45a-49039612857d',
                    checked: true,
                    createdAt: '2020-04-14T17:52:53.000Z',
                    id: '0a8e7a57-bbe6-4322-a484-55894b69227e',
                    keterangan: '',
                    nomor: '206',
                    updatedAt: '2020-04-14T17:52:53.000Z',
                  },
                ],
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Pilih Reservasi Kamar',
        },
      },
    },
  },
}
