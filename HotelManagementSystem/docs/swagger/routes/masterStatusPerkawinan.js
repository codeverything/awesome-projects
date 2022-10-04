module.exports = {
  '/master-status-perkawinan': {
    get: {
      tags: ['Master Status Perkawinan'],
      summary: 'Get All Master Status Perkawinan',
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
          description: 'Get All Master Status Perkawinan',
        },
      },
    },
    post: {
      tags: ['Master Status Perkawinan'],
      summary: 'Create New Master Status Perkawinan',
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
          description: 'Create New Master Status Perkawinan',
        },
      },
    },
  },
  '/master-status-perkawinan/{id}': {
    get: {
      tags: ['Master Status Perkawinan'],
      summary: 'Get Master Status Perkawinan By Id',
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
          description: 'Master Status Perkawinan Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Status Perkawinan By Id',
        },
      },
    },
    put: {
      tags: ['Master Status Perkawinan'],
      summary: 'Update Data Master Status Perkawinan',
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
          description: 'Master Status Perkawinan Id',
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
          description: 'Update Data Master Status Perkawinan',
        },
      },
    },
    delete: {
      tags: ['Master Status Perkawinan'],
      summary: 'Delete Master Status Perkawinan By Id',
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
          description: 'Master Status Perkawinan Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Status Perkawinan By Id',
        },
      },
    },
  },
}
