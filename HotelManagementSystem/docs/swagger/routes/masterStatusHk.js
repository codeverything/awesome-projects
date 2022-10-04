module.exports = {
  '/master-status-hk': {
    get: {
      tags: ['Master Status HK'],
      summary: 'Get All Master Status HK',
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
          description: 'Get All Master Status HK',
        },
      },
    },
    post: {
      tags: ['Master Status HK'],
      summary: 'Create New Master Status HK',
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
          description: 'Create New Master Status HK',
        },
      },
    },
  },
  '/master-status-hk/{id}': {
    get: {
      tags: ['Master Status HK'],
      summary: 'Get Master Status HK By Id',
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
          description: 'Master Status HK Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Status HK By Id',
        },
      },
    },
    put: {
      tags: ['Master Status HK'],
      summary: 'Update Data Master Status HK',
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
          description: 'Master Status HK Id',
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
          description: 'Update Data Master Status HK',
        },
      },
    },
    delete: {
      tags: ['Master Status HK'],
      summary: 'Delete Master Status HK By Id',
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
          description: 'Master Status HK Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Status HK By Id',
        },
      },
    },
  },
  '/statushk-check-swap': {
    get: {
      tags: ['Master Status HK'],
      summary: 'Get All Master Status HK',
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
          description: 'Get All Master Status HK',
        },
      },
    },
  },
}
