module.exports = {
  '/master-setup-ruangan': {
    get: {
      tags: ['Master Setup Ruangan'],
      summary: 'Get All Master Setup Ruangan',
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
          description: 'Get All Master Setup Ruangan',
        },
      },
    },
    post: {
      tags: ['Master Setup Ruangan'],
      summary: 'Create New Master Setup Ruangan',
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
          description: 'Create New Master Setup Ruangan',
        },
      },
    },
  },
  '/master-setup-ruangan/{id}': {
    get: {
      tags: ['Master Setup Ruangan'],
      summary: 'Get Master Setup Ruangan By Id',
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
          description: 'Master Setup Ruangan Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Setup Ruangan By Id',
        },
      },
    },
    put: {
      tags: ['Master Setup Ruangan'],
      summary: 'Update Data Master Setup Ruangan',
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
          description: 'Master Setup Ruangan Id',
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
          description: 'Update Data Master Setup Ruangan',
        },
      },
    },
    delete: {
      tags: ['Master Setup Ruangan'],
      summary: 'Delete Master Setup Ruangan By Id',
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
          description: 'Master Setup Ruangan Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Setup Ruangan By Id',
        },
      },
    },
  },
}
