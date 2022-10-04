module.exports = {
  '/master-status-pemesanan': {
    get: {
      tags: ['Master Status Pemesanan'],
      summary: 'Get All Master Status Pemesanan',
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
          description: 'Get All Master Status Pemesanan',
        },
      },
    },
    post: {
      tags: ['Master Status Pemesanan'],
      summary: 'Create New Master Status Pemesanan',
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
          description: 'Create New Master Status Pemesanan',
        },
      },
    },
  },
  '/master-status-pemesanan/{id}': {
    get: {
      tags: ['Master Status Pemesanan'],
      summary: 'Get Master Status Pemesanan By Id',
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
          description: 'Master Status Pemesanan Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Status Pemesanan By Id',
        },
      },
    },
    put: {
      tags: ['Master Status Pemesanan'],
      summary: 'Update Data Master Status Pemesanan',
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
          description: 'Master Status Pemesanan Id',
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
          description: 'Update Data Master Status Pemesanan',
        },
      },
    },
    delete: {
      tags: ['Master Status Pemesanan'],
      summary: 'Delete Master Status Pemesanan By Id',
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
          description: 'Master Status Pemesanan Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Status Pemesanan By Id',
        },
      },
    },
  },
}
