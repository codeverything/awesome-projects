module.exports = {
  '/master-fungsi-ruangan': {
    get: {
      tags: ['Master Fungsi Ruangan'],
      summary: 'Get All Master Fungsi Ruangan',
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
          description: 'Get All Master Fungsi Ruangan',
        },
      },
    },
    post: {
      tags: ['Master Fungsi Ruangan'],
      summary: 'Create New Master Fungsi Ruangan',
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
          description: 'Create New Master Fungsi Ruangan',
        },
      },
    },
  },
  '/master-fungsi-ruangan/{id}': {
    get: {
      tags: ['Master Fungsi Ruangan'],
      summary: 'Get Master Fungsi Ruangan By Id',
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
          description: 'Master Fungsi Ruangan Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Fungsi Ruangan By Id',
        },
      },
    },
    put: {
      tags: ['Master Fungsi Ruangan'],
      summary: 'Update Data Master Fungsi Ruangan',
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
          description: 'Master Fungsi Ruangan Id',
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
          description: 'Update Data Master Fungsi Ruangan',
        },
      },
    },
    delete: {
      tags: ['Master Fungsi Ruangan'],
      summary: 'Delete Master Fungsi Ruangan By Id',
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
          description: 'Master Fungsi Ruangan Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Fungsi Ruangan By Id',
        },
      },
    },
  },
}
