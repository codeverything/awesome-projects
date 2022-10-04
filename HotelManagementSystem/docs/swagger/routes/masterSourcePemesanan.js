module.exports = {
  '/master-source-pemesanan': {
    get: {
      tags: ['Master Source Pemesanan'],
      summary: 'Get All Master Source Pemesanan',
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
          description: 'Get All Master Source Pemesanan',
        },
      },
    },
    post: {
      tags: ['Master Source Pemesanan'],
      summary: 'Create New Master Source Pemesanan',
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
          description: 'Create New Master Source Pemesanan',
        },
      },
    },
  },
  '/master-source-pemesanan/{id}': {
    get: {
      tags: ['Master Source Pemesanan'],
      summary: 'Get Master Source Pemesanan By Id',
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
          description: 'Master Source Pemesanan Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Source Pemesanan By Id',
        },
      },
    },
    put: {
      tags: ['Master Source Pemesanan'],
      summary: 'Update Data Master Source Pemesanan',
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
          description: 'Master Source Pemesanan Id',
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
          description: 'Update Data Master Source Pemesanan',
        },
      },
    },
    delete: {
      tags: ['Master Source Pemesanan'],
      summary: 'Delete Master Source Pemesanan By Id',
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
          description: 'Master Source Pemesanan Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Source Pemesanan By Id',
        },
      },
    },
  },
}
