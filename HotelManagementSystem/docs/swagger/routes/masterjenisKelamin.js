module.exports = {
  '/master-jenis-kelamin': {
    get: {
      tags: ['Master Jenis Kelamin'],
      summary: 'Get All Master Jenis Kelamin',
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
          description: 'Get All Master Jenis Kelamin',
        },
      },
    },
    post: {
      tags: ['Master Jenis Kelamin'],
      summary: 'Create New Master Jenis Kelamin',
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
          description: 'Create New Master Jenis Kelamin',
        },
      },
    },
  },
  '/master-jenis-kelamin/{id}': {
    get: {
      tags: ['Master Jenis Kelamin'],
      summary: 'Get Master Jenis Kelamin By Id',
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
          description: 'Master Jenis Kelamin Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Jenis Kelamin By Id',
        },
      },
    },
    put: {
      tags: ['Master Jenis Kelamin'],
      summary: 'Update Data Master Jenis Kelamin',
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
          description: 'Master Jenis Kelamin Id',
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
          description: 'Update Data Master Jenis Kelamin',
        },
      },
    },
    delete: {
      tags: ['Master Jenis Kelamin'],
      summary: 'Delete Master Jenis Kelamin By Id',
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
          description: 'Master Jenis Kelamin Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Jenis Kelamin By Id',
        },
      },
    },
  },
}
