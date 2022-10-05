module.exports = {
  '/master-fasilitas-tambahan': {
    get: {
      tags: ['Master Fasilitas Tambahan'],
      summary: 'Get All Master Fasilitas Tambahan',
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
          description: 'Get All Master Fasilitas Tambahan',
        },
      },
    },
    post: {
      tags: ['Master Fasilitas Tambahan'],
      summary: 'Create New Master Fasilitas Tambahan',
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
                JenisFasilitasTambahanId: {
                  type: 'string',
                  format: 'uuid',
                },
                MasterSourcePemesananId: {
                  type: 'string',
                  format: 'uuid',
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
          description: 'Create New Master Fasilitas Tambahan',
        },
      },
    },
  },
  '/master-fasilitas-tambahan/{id}': {
    get: {
      tags: ['Master Fasilitas Tambahan'],
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
          description: 'Master Fasilitas Tambahan Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Fasilitas Tambahan By Id',
        },
      },
    },
    put: {
      tags: ['Master Fasilitas Tambahan'],
      summary: 'Update Data Master Fasilitas Tambahan',
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
          description: 'Master Fasilitas Tambahan Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                JenisFasilitasTambahanId: {
                  type: 'string',
                  format: 'uuid',
                },
                MasterSourcePemesananId: {
                  type: 'string',
                  format: 'uuid',
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
          description: ' Master Fasilitas Tambahan',
        },
      },
    },
    delete: {
      tags: ['Master Fasilitas Tambahan'],
      summary: 'Delete Master Fasilitas Tambahan By Id',
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
          description: 'Master Fasilitas Tambahan Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Fasilitas Tambahan By Id',
        },
      },
    },
  },
}
