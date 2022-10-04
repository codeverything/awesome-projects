module.exports = {
  '/master-item-pembayaran': {
    get: {
      tags: ['Master Item Pembayaran'],
      summary: 'Get All Master Item Pembayaran',
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
          description: 'Get All Master Item Pembayaran',
        },
      },
    },
    post: {
      tags: ['Master Item Pembayaran'],
      summary: 'Create New Master Item Pembayaran',
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
          description: 'Create New Master Item Pembayaran',
        },
      },
    },
  },
  '/master-item-pembayaran/{id}': {
    get: {
      tags: ['Master Item Pembayaran'],
      summary: 'Get Master Item Pembayaran By Id',
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
          description: 'Master Item Pembayaran Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Item Pembayaran By Id',
        },
      },
    },
    put: {
      tags: ['Master Item Pembayaran'],
      summary: 'Update Data Master Item Pembayaran',
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
          description: 'Master Item Pembayaran Id',
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
          description: 'Update Data Master Item Pembayaran',
        },
      },
    },
    delete: {
      tags: ['Master Item Pembayaran'],
      summary: 'Delete Master Item Pembayaran By Id',
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
          description: 'Master Item Pembayaran Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Item Pembayaran By Id',
        },
      },
    },
  },
}
