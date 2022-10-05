module.exports = {
  '/master-tipe-identitas': {
    get: {
      tags: ['Master Tipe Identitas'],
      summary: 'Get All Master Tipe Identitas',
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
          description: 'Get All Master Tipe Identitas',
        },
      },
    },
    post: {
      tags: ['Master Tipe Identitas'],
      summary: 'Create New Master Tipe Identitas',
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
          description: 'Create New Master Tipe Identitas',
        },
      },
    },
  },
  '/master-tipe-identitas/{id}': {
    get: {
      tags: ['Master Tipe Identitas'],
      summary: 'Get Master Tipe Identitas By Id',
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
          description: 'Master Tipe Identitas Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Tipe Identitas By Id',
        },
      },
    },
    put: {
      tags: ['Master Tipe Identitas'],
      summary: 'Update Data Master Tipe Identitas',
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
          description: 'Master Tipe Identitas Id',
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
          description: 'Update Data Master Tipe Identitas',
        },
      },
    },
    delete: {
      tags: ['Master Tipe Identitas'],
      summary: 'Delete Master Tipe Identitas By Id',
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
          description: 'Master Tipe Identitas Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Tipe Identitas By Id',
        },
      },
    },
  },
}
