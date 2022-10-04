module.exports = {
  '/master-status-tagihan': {
    get: {
      tags: ['Master Status Tagihan'],
      summary: 'Get All Master Status Tagihan',
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
          description: 'Get All Master Status Tagihan',
        },
      },
    },
    post: {
      tags: ['Master Status Tagihan'],
      summary: 'Create New Master Status Tagihan',
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
          description: 'Create New Master Status Tagihan',
        },
      },
    },
  },
  '/master-status-tagihan/{id}': {
    get: {
      tags: ['Master Status Tagihan'],
      summary: 'Get Master Status Tagihan By Id',
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
          description: 'Master Status Tagihan Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Status Tagihan By Id',
        },
      },
    },
    put: {
      tags: ['Master Status Tagihan'],
      summary: 'Update Data Master Status Tagihan',
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
          description: 'Master Status Tagihan Id',
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
          description: 'Update Data Master Status Tagihan',
        },
      },
    },
    delete: {
      tags: ['Master Status Tagihan'],
      summary: 'Delete Master Status Tagihan By Id',
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
          description: 'Master Status Tagihan Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Status Tagihan By Id',
        },
      },
    },
  },
}
