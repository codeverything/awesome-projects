module.exports = {
  '/harga-spesifikasi-kamar': {
    get: {
      tags: ['Harga Spesifikasi Kamar'],
      summary: 'Get All Harga Spesifikasi Kamar',
      security: [
        {
          auth_token: [],
        },
      ],
      produces: ['application/json'],
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
          description: 'Get All Harga Spesifikasi Kamar',
        },
      },
    },
    post: {
      tags: ['Harga Spesifikasi Kamar'],
      summary: 'Create New Harga Spesifikasi Kamar',
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
                SpesifikasiKamarId: {
                  type: 'string',
                  format: 'uuid',
                },
                tanggalMulai: {
                  type: 'string',
                  format: 'fulldate',
                },
                tanggalSelesai: {
                  type: 'string',
                  format: 'fulldate',
                },
                harga: {
                  type: 'integer',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Harga Spesifikasi Kamar',
        },
      },
    },
  },
  '/harga-spesifikasi-kamar/{id}': {
    get: {
      tags: ['Harga Spesifikasi Kamar'],
      summary: 'Get Harga Spesifikasi Kamar By Id',
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
          description: 'Harga Spesifikasi Kamar Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Harga Spesifikasi Kamar By Id',
        },
      },
    },
    put: {
      tags: ['Harga Spesifikasi Kamar'],
      summary: 'Update Data Harga Spesifikasi Kamar',
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
          description: 'Harga Spesifikasi Kamar Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                SpesifikasiKamarId: {
                  type: 'string',
                  format: 'uuid',
                },
                tanggalMulai: {
                  type: 'string',
                  format: 'fulldate',
                },
                tanggalSelesai: {
                  type: 'string',
                  format: 'fulldate',
                },
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
          description: 'Update Data Harga Spesifikasi Kamar',
        },
      },
    },
    delete: {
      tags: ['Harga Spesifikasi Kamar'],
      summary: 'Delete Harga Spesifikasi Kamar By Id',
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
          description: 'Harga Spesifikasi Kamar Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Harga Spesifikasi Kamar By Id',
        },
      },
    },
  },
}
