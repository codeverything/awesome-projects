module.exports = {
  '/detail-room-hk/{id}': {
    post: {
      tags: ['Room HK'],
      summary: 'Barang linen dan non linen rusak add',
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
          description: 'Kamar Id',
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
                  example: 'test hak akses jon',
                },
              },
              example: {
                linen: [
                  {
                    barangId: {
                      type: 'string',
                      format: 'uuid',
                      description: 'Linen Id',
                    },
                    jumlah: {
                      type: 'integer',
                    },
                    MasterTagihanKerusakanKehilanganId: {
                      type: 'string',
                      format: 'uuid',
                    },
                  },
                ],
                nonLinen: [
                  {
                    barangId: {
                      type: 'string',
                      format: 'uuid',
                      description: 'Linen Id',
                    },
                    jumlah: {
                      type: 'integer',
                    },
                    MasterTagihanKerusakanKehilanganId: {
                      type: 'string',
                      format: 'uuid',
                    },
                  },
                ],
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Barang linen dan non linen rusak berahasil di input',
        },
      },
    },
  },
  '/detail-room-linen/{id}': {
    put: {
      tags: ['Room HK'],
      summary: 'Barang linen dan non linen rusak add',
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
          description: 'Kamar Id',
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
                  format: 'uuid',
                },
                masukBersih: {
                  type: 'integer',
                },
                keluarKotor: {
                  type: 'integer',
                },
                hilangAkhir: {
                  type: 'integer',
                },
                rusakAkhir: {
                  type: 'integer',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Barang linen dan non linen rusak berahasil di input',
        },
      },
    },
  },
  '/amenity-hk': {
    post: {
      tags: ['Room HK'],
      summary: 'input amenity di room hk',
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
                AmenityId: {
                  type: 'string',
                  format: 'uuid',
                },
                jumlah: {
                  type: 'integer',
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
        201: {
          description: 'input amenity di room hk',
        },
      },
    },
  },
  '/amenity-hk/{id}': {
    put: {
      tags: ['Room HK'],
      summary: 'input amenity di room hk',
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
          description: 'Kamar Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                AmenityId: {
                  type: 'string',
                  format: 'uuid',
                },
                jumlah: {
                  type: 'integer',
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
        201: {
          description: 'input amenity di room hk',
        },
      },
    },
    delete: {
      tags: ['Room HK'],
      summary: 'Delete Amenity Hk in Room By Id',
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
            format: 'uuid',
          },
          description: 'Amenity Supply Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Amenity Supply Id By Id',
        },
      },
    },
  },
  '/lost-and-found': {
    post: {
      tags: ['Room HK'],
      summary: 'input barang lost and found di room hk',
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
                namaBarang: {
                  type: 'string',
                  format: 'uuid',
                },
                jumlah: {
                  type: 'integer',
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
        201: {
          description: 'input barang lost and found di room hk',
        },
      },
    },
  },
  '/lost-and-found/{id}': {
    post: {
      tags: ['Room HK'],
      summary: 'update barang lost and found di room hk',
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
          description: 'lost and found Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                namaBarang: {
                  type: 'string',
                  format: 'uuid',
                },
                jumlah: {
                  type: 'integer',
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
        201: {
          description: 'input barang lost and found di room hk',
        },
      },
    },
    delete: {
      tags: ['Room HK'],
      summary: 'Delete Lost and Found in Room By Id',
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
            format: 'uuid',
          },
          description: 'Lost and Found Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Lost and Found Id By Id',
        },
      },
    },
  },
  '/update-status-kamar/{id}': {
    post: {
      tags: ['Room HK'],
      summary: 'Update Status Kamar Di Room HK',
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
          description: 'Kamar Id',
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
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'input barang lost and found di room hk',
        },
      },
    },
  },
}
