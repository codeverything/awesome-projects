module.exports = {
  '/master-status-pembayaran': {
    get: {
      tags: ['Master Status Pembayaran'],
      summary: 'Get All Master Status Pembayaran',
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
          description: 'Get All Master Status Pembayaran',
        },
      },
    },
    post: {
      tags: ['Master Status Pembayaran'],
      summary: 'Create New Master Status Pembayaran',
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
          description: 'Create New Master Status Pembayaran',
        },
      },
    },
  },
  '/master-status-pembayaran/{id}': {
    get: {
      tags: ['Master Status Pembayaran'],
      summary: 'Get Master Status Pembayaran By Id',
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
          description: 'Master Status Pembayaran Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Status Pembayaran By Id',
        },
      },
    },
    put: {
      tags: ['Master Status Pembayaran'],
      summary: 'Update Data Master Status Pembayaran',
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
          description: 'Master Status Pembayaran Id',
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
          description: 'Update Data Master Status Pembayaran',
        },
      },
    },
    delete: {
      tags: ['Master Status Pembayaran'],
      summary: 'Delete Master Status Pembayaran By Id',
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
          description: 'Master Status Pembayaran Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Status Pembayaran By Id',
        },
      },
    },
  },
}
