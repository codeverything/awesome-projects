module.exports = {
  '/konsumsi': {
    get: {
      tags: ['Konsumsi'],
      summary: 'Get All Konsumsi',
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
          description: 'Get All Konsumsi',
        },
      },
    },
    post: {
      tags: ['Konsumsi'],
      summary: 'Create New Konsumsi',
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
          description: 'Create New Konsumsi',
        },
      },
    },
  },
  '/konsumsi/{id}': {
    get: {
      tags: ['Konsumsi'],
      summary: 'Get Konsumsi By Id',
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
          description: 'Konsumsi Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Konsumsi By Id',
        },
      },
    },
    put: {
      tags: ['Konsumsi'],
      summary: 'Update Data Konsumsi',
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
          description: 'Konsumsi Id',
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
          description: 'Update Data Konsumsi',
        },
      },
    },
    delete: {
      tags: ['Konsumsi'],
      summary: 'Delete Konsumsi By Id',
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
          description: 'Konsumsi Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Konsumsi By Id',
        },
      },
    },
  },
}
