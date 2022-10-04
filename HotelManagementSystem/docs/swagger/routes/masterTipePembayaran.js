module.exports = {
  '/master-tipe-pembayaran': {
    get: {
      tags: ['Master Tipe Pembayaran'],
      summary: 'Get All Master Tipe Pembayaran',
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
          description: 'Get All Master Tipe Pembayaran',
        },
      },
    },
    post: {
      tags: ['Master Tipe Pembayaran'],
      summary: 'Create New Master Tipe Pembayaran',
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
          description: 'Create New Master Tipe Pembayaran',
        },
      },
    },
  },
  '/master-tipe-pembayaran/{id}': {
    get: {
      tags: ['Master Tipe Pembayaran'],
      summary: 'Get Master Tipe Pembayaran By Id',
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
          description: 'Master Tipe Pembayaran Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Tipe Pembayaran By Id',
        },
      },
    },
    put: {
      tags: ['Master Tipe Pembayaran'],
      summary: 'Update Data Master Tipe Pembayaran',
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
          description: 'Master Tipe Pembayaran Id',
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
          description: 'Update Data Master Tipe Pembayaran',
        },
      },
    },
    delete: {
      tags: ['Master Tipe Pembayaran'],
      summary: 'Delete Master Tipe Pembayaran By Id',
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
          description: 'Master Tipe Pembayaran Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Tipe Pembayaran By Id',
        },
      },
    },
  },
}
