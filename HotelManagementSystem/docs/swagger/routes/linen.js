module.exports = {
  '/linen': {
    get: {
      tags: ['Linen'],
      summary: 'Get All Linen',
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
          description: 'Get All Linen',
        },
      },
    },
    post: {
      tags: ['Linen'],
      summary: 'Create New Linen',
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
                idItem: {
                  type: 'string',
                },
                nama: {
                  type: 'string',
                },
                harga: {
                  type: 'integer',
                },
                jumlah: {
                  type: 'integer',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Linen',
        },
      },
    },
  },
  '/linen/{id}': {
    get: {
      tags: ['Linen'],
      summary: 'Get Linen By Id',
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
          description: 'Linen Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Linen By Id',
        },
      },
    },
    put: {
      tags: ['Linen'],
      summary: 'Update Data Linen',
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
          description: 'Linen Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                idItem: {
                  type: 'string',
                },
                nama: {
                  type: 'string',
                },
                harga: {
                  type: 'integer',
                },
                jumlah: {
                  type: 'integer',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Update Data Linen',
        },
      },
    },
    delete: {
      tags: ['Linen'],
      summary: 'Delete Linen By Id',
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
          description: 'Linen Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Linen By Id',
        },
      },
    },
  },
}
