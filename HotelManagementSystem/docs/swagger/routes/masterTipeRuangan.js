module.exports = {
  '/master-tipe-ruangan': {
    get: {
      tags: ['Master Tipe Ruangan'],
      summary: 'Get All Master Tipe Ruangan',
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
          description: 'Get All Master Tipe Ruangan',
        },
      },
    },
    post: {
      tags: ['Master Tipe Ruangan'],
      summary: 'Create New Master Tipe Ruangan',
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
          description: 'Create New Master Tipe Ruangan',
        },
      },
    },
  },
  '/master-tipe-ruangan/{id}': {
    get: {
      tags: ['Master Tipe Ruangan'],
      summary: 'Get Master Tipe Ruangan By Id',
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
          description: 'Master Tipe Ruangan Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Tipe Ruangan By Id',
        },
      },
    },
    put: {
      tags: ['Master Tipe Ruangan'],
      summary: 'Update Data Master Tipe Ruangan',
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
          description: 'Master Tipe Ruangan Id',
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
          description: 'Update Data Master Tipe Ruangan',
        },
      },
    },
    delete: {
      tags: ['Master Tipe Ruangan'],
      summary: 'Delete Master Tipe Ruangan By Id',
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
          description: 'Master Tipe Ruangan Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Tipe Ruangan By Id',
        },
      },
    },
  },
}
