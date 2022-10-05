module.exports = {
  '/informasi-corporate': {
    get: {
      tags: ['Informasi Corporate'],
      summary: 'Get All Informasi Corporate',
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
          description: 'Get All Informasi Corporate',
        },
      },
    },
    post: {
      tags: ['Informasi Corporate'],
      summary: 'Create New Informasi Corporate',
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
                  example: 'PT.Maju',
                },
                alamat: {
                  type: 'string',
                  example: 'Jl. Maju Mundur',
                },
                nomorHandphone: {
                  type: 'string',
                  example: '08113363807',
                },
                email: {
                  type: 'string',
                  example: 'test@email.com',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Informasi Corporate',
        },
      },
    },
  },
  '/informasi-corporate/{id}': {
    get: {
      tags: ['Informasi Corporate'],
      summary: 'Get User By Id',
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
          description: 'Informasi Corporate Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Informasi Corporate By Id',
        },
      },
    },
    put: {
      tags: ['Informasi Corporate'],
      summary: 'Update Data Informasi Corporate',
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
          description: 'Informasi Corporate Id',
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
                  example: 'PT.Maju',
                },
                alamat: {
                  type: 'string',
                  example: 'Jl. Maju Mundur',
                },
                nomorHandphone: {
                  type: 'string',
                  example: '08113363807',
                },
                email: {
                  type: 'string',
                  example: 'test@email.com',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Update Data Informasi Corporate',
        },
      },
    },
    delete: {
      tags: ['Informasi Corporate'],
      summary: 'Delete Informasi Corporate By Id',
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
          description: 'Informasi Corporate Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Informasi Corporate By Id',
        },
      },
    },
  },
}
