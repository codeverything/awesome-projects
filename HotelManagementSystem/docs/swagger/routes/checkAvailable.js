module.exports = {
  '/check-available': {
    post: {
      tags: ['Informasi Kamar'],
      summary: 'Get Total Check Available',
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
                MasterSpecialRequirementId: {
                  type: 'string',
                  format: 'uuid',
                },
                MasterTipeKamarId: {
                  type: 'string',
                  format: 'fulldate',
                },
                MasterTipeKasurId: {
                  type: 'string',
                  format: 'uuid',
                },
                tanggalCheckIn: {
                  type: 'string',
                  format: 'fulldate',
                },
                tanggalCheckOut: {
                  type: 'string',
                  format: 'fulldate',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Get All Total Check Available',
        },
      },
    },
  },
  '/calculate/reservasi-kamar': {
    post: {
      tags: ['Informasi Kamar'],
      summary: 'Get Total Calculate Reservasi Kamar',
      security: [
        {
          auth_token: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                nama: {
                  type: 'string',
                },
              },
              example: {
                ReservasiKamars: [
                  {
                    tanggalCheckIn: '2020-11-20T06:55:08.550Z',
                    tanggalCheckOut: '2020-11-22T06:55:11.215Z',
                    MasterSpecialRequirementId:
                      'eb3a3305-3995-449b-8d28-58cbbe012122',
                    MasterTipeKamarId: 'c016e6b4-278d-451e-a11b-56d5bceb6054',
                    MasterTipeKasurId: '140824d7-b9b2-496d-afbc-049f01fd63da',
                    keterangan: 'asd',
                    ReservasiFasilitasTambahans: [],
                  },
                  {
                    tanggalCheckIn: '2020-11-20T06:55:08.550Z',
                    tanggalCheckOut: '2020-11-22T06:55:11.215Z',
                    MasterSpecialRequirementId:
                      'eb3a3305-3995-449b-8d28-58cbbe012122',
                    MasterTipeKamarId: 'c016e6b4-278d-451e-a11b-56d5bceb6054',
                    MasterTipeKasurId: '140824d7-b9b2-496d-afbc-049f01fd63da',
                    keterangan: 'asd',
                    ReservasiFasilitasTambahans: [
                      {
                        MasterFasilitasTambahanId:
                          '82f42e71-701a-4b8f-85cf-b99c1bc5138f',
                        jumlah: 1,
                      },
                      {
                        MasterFasilitasTambahanId:
                          'e2d8d694-7974-400b-8eb6-31f5bcd4c3ca',
                        jumlah: 1,
                      },
                    ],
                  },
                ],
                MasterSourcePemesananId: 'f5ffc769-5b11-443c-b093-6017ad2a95a4',
              },
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
  },
  '/edit-harga/{id}': {
    put: {
      tags: ['Informasi Kamar'],
      summary: 'Update Data Informasi Kamar',
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
          description: 'Spesifikasi Kamar Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                harga: {
                  type: 'integer',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Update Data Informasi Kamar',
        },
      },
    },
  },
}
