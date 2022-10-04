module.exports = {
  '/master-tipe-kasur': {
    get: {
      tags: ['Master Tipe Kasur'],
      summary: 'Get All Master Tipe Kasur',
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
          description: 'Get All Master Tipe Kasur',
        },
      },
    },
    post: {
      tags: ['Master Tipe Kasur'],
      summary: 'Create New Master Tipe Kasur',
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
              required: ['nama'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Master Tipe Kasur',
        },
      },
    },
  },
  '/master-tipe-kasur/{id}': {
    get: {
      tags: ['Master Tipe Kasur'],
      summary: 'Get Master Tipe Kasur By Id',
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
          description: 'Master Tipe Kasur Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Tipe Kasur By Id',
        },
      },
    },
    put: {
      tags: ['Master Tipe Kasur'],
      summary: 'Update Data Master Tipe Kasur',
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
          description: 'Master Tipe Kasur Id',
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
              required: ['nama'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Update Data Master Tipe Kasur',
        },
      },
    },
    delete: {
      tags: ['Master Tipe Kasur'],
      summary: 'Delete Master Tipe Kasur By Id',
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
          description: 'Master Tipe Kasur Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Tipe Kasur By Id',
        },
      },
    },
  },
}
