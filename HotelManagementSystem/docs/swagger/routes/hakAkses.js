module.exports = {
  '/hak-akses': {
    get: {
      tags: ['Hak Akses'],
      summary: 'Get All Hak Akses',
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
          description: 'Get All Hak Akses',
        },
      },
    },
    post: {
      tags: ['Hak Akses'],
      summary: 'Create New Hak Akses',
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
                  example: 'test hak akses jon',
                },
              },
              example: {
                nama: 'Nama Hak Akses jon',
                hakAkses: {
                  frontOffice: {
                    listReservasi: {
                      view: 1,
                      delete: 1,
                      create: 1,
                      update: 1,
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
          description: 'Create New Hak Akses',
        },
      },
    },
  },
  '/hak-akses/{id}': {
    get: {
      tags: ['Hak Akses'],
      summary: 'Get Hak Akses By Id',
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
          },
          description: 'Hak Akses Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Hak Akses By Id',
        },
      },
    },
    put: {
      tags: ['Hak Akses'],
      summary: 'Update Data Hak Akses',
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
          description: 'Hak Akses Id',
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
                nama: 'Nama Hak Akses jon',
                hakAkses: {
                  frontOffice: {
                    listReservasi: {
                      view: 1,
                      delete: 1,
                      create: 1,
                      update: 1,
                    },
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Update Data Hak Akses',
        },
      },
    },
    delete: {
      tags: ['Hak Akses'],
      summary: 'Delete Hak Akses By Id',
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
          description: 'Hak Akses Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Hak Akses By Id',
        },
      },
    },
  },
}
