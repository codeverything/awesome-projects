module.exports = {
  '/master-special-requirement': {
    get: {
      tags: ['Master Special Requirement'],
      summary: 'Get All Master Special Requirement',
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
          description: 'Get All Master Special Requirement',
        },
      },
    },
    post: {
      tags: ['Master Special Requirement'],
      summary: 'Create New Master Special Requirement',
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
          description: 'Create New Master Special Requirement',
        },
      },
    },
  },
  '/master-special-requirement/{id}': {
    get: {
      tags: ['Master Special Requirement'],
      summary: 'Get Master Special Requirement By Id',
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
          description: 'Master Special Requirement Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Special Requirement By Id',
        },
      },
    },
    put: {
      tags: ['Master Special Requirement'],
      summary: 'Update Data Master Special Requirement',
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
          description: 'Master Special Requirement Id',
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
          description: 'Update Data Master Special Requirement',
        },
      },
    },
    delete: {
      tags: ['Master Special Requirement'],
      summary: 'Delete Master Special Requirement By Id',
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
          description: 'Master Special Requirement Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Special Requirement By Id',
        },
      },
    },
  },
}
