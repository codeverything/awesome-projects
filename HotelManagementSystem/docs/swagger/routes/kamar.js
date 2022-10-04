module.exports = {
  '/kamar': {
    get: {
      tags: ['Kamar'],
      summary: 'Get All Kamar',
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
          description: 'Get All Kamar',
        },
      },
    },
    post: {
      tags: ['Kamar'],
      summary: 'Create New Kamar',
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
                nomor: {
                  type: 'string',
                  format: 'uuid',
                },
                SpesifikasiKamarId: {
                  type: 'string',
                  format: 'uuid',
                },
                MasterStatusHKId: {
                  type: 'string',
                  format: 'fulldate',
                },
                MasterStatusKamarId: {
                  type: 'string',
                  format: 'uuid',
                },
                connected: {
                  type: 'boolean',
                },
                kamar: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      format: 'uuid',
                    },
                    nomor: {
                      type: 'string',
                      example: '201',
                    },
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Kamar',
        },
      },
    },
  },
  '/kamar/{id}': {
    get: {
      tags: ['Kamar'],
      summary: 'Get Kamar By Spesifikasi Id',
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
          description: 'Kamar Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Kamar By Id',
        },
      },
    },
    put: {
      tags: ['Kamar'],
      summary: 'Update Data Kamar',
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
        properties: {
          nomor: {
            type: 'string',
            format: 'uuid',
          },
          SpesifikasiKamarId: {
            type: 'string',
            format: 'uuid',
          },
          MasterStatusHKId: {
            type: 'string',
            format: 'fulldate',
          },
          MasterStatusKamarId: {
            type: 'string',
            format: 'uuid',
          },
          keterangan: {
            type: 'string',
          },
          connected: {
            type: 'boolean',
          },
        },
      },
      responses: {
        200: {
          description: 'Reservasi Kamar',
        },
      },
    },
    delete: {
      tags: ['Kamar'],
      summary: 'Delete Kamar By Id',
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
          description: 'Kamar Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Kamar By Id',
        },
      },
    },
  },
  '/kamar-detail/{id}': {
    get: {
      tags: ['Kamar'],
      summary: 'Get Kamar Detail',
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
          description: 'Kamar Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Kamar By Id',
        },
      },
    },
  },
  '/list-swap-by-spesifikasi/{id}': {
    get: {
      tags: ['Kamar'],
      summary: 'Get All room Exclude room with lower price than initial room',
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
          description:
            'Get All room Exclude room with lower price than initial room',
        },
      },
    },
  },
}
