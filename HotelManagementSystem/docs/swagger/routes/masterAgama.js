module.exports = {
  '/master-agama': {
    get: {
      tags: ['Master Agama'],
      summary: 'Get All Master Agama',
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
          description: 'Get All Master Agama',
        },
      },
    },
    post: {
      tags: ['Master Agama'],
      summary: 'Create New Master Agama',
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
          description: 'Create New Master Agama',
        },
      },
    },
  },
  '/master-agama/{id}': {
    get: {
      tags: ['Master Agama'],
      summary: 'Get Master Agama By Id',
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
          description: 'Master Agama Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Agama By Id',
        },
      },
    },
    put: {
      tags: ['Master Agama'],
      summary: 'Update Data Master Agama',
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
          description: 'Master Agama Id',
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
          description: 'Update Data Master Agama',
        },
      },
    },
    delete: {
      tags: ['Master Agama'],
      summary: 'Delete Master Agama By Id',
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
          description: 'Master Agama Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Agama By Id',
        },
      },
    },
  },
}
