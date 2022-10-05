module.exports = {
  '/jenis-fasilitas-tambahan': {
    get: {
      tags: ['Jenis Fasilitas Tambahan'],
      summary: 'Get All Jenis Fasilitas Tambahan',
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
          description: 'Get All Jenis Fasilitas Tambahan',
        },
      },
    },
    post: {
      tags: ['Jenis Fasilitas Tambahan'],
      summary: 'Create New Jenis Fasilitas Tambahan',
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
                nama: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Jenis Fasilitas Tambahan',
        },
      },
    },
  },
  '/jenis-fasilitas-tambahan/{id}': {
    get: {
      tags: ['Jenis Fasilitas Tambahan'],
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
          description: 'Jenis Fasilitas Tambahan Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Jenis Fasilitas Tambahan By Id',
        },
      },
    },
    put: {
      tags: ['Jenis Fasilitas Tambahan'],
      summary: 'Update Data Jenis Fasilitas Tambahan',
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
          description: 'Jenis Fasilitas Tambahan Id',
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
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Reservasi Jenis Fasilitas Tambahan',
        },
      },
    },
    delete: {
      tags: ['Jenis Fasilitas Tambahan'],
      summary: 'Delete Jenis Fasilitas Tambahan By Id',
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
          description: 'Jenis Fasilitas Tambahan Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Jenis Fasilitas Tambahan By Id',
        },
      },
    },
  },
}
