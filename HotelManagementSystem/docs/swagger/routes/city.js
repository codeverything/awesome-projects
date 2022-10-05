module.exports = {
  '/city': {
    get: {
      tags: ['City'],
      summary: 'Get All City',
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
          description: 'Get All City',
        },
      },
    },
    post: {
      tags: ['City'],
      summary: 'Create New City',
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
          description: 'Create New City',
        },
      },
    },
  },
  '/city/{id}': {
    get: {
      tags: ['City'],
      summary: 'Get City By Id',
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
            type: 'integer',
          },
          description: 'City Id',
        },
      ],
      responses: {
        200: {
          description: 'Get City By Id',
        },
      },
    },
    put: {
      tags: ['City'],
      summary: 'Update Data City',
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
            type: 'integer',
          },
          description: 'City Id',
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
          description: 'Update Data City',
        },
      },
    },
    delete: {
      tags: ['City'],
      summary: 'Delete City By Id',
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
            type: 'integer',
          },
          description: 'City Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete City By Id',
        },
      },
    },
  },
}
