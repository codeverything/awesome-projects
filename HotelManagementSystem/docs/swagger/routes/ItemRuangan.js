module.exports = {
  '/item-ruangan': {
    get: {
      tags: ['Item Ruangan'],
      summary: 'Get All Item Ruangan',
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
          description: 'Get All Item Ruangan',
        },
      },
    },
    post: {
      tags: ['Item Ruangan'],
      summary: 'Create New Item Ruangan',
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
          description: 'Create New Item Ruangan',
        },
      },
    },
  },
  '/item-ruangan/{id}': {
    get: {
      tags: ['Item Ruangan'],
      summary: 'Get Item Ruangan By Id',
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
          description: 'Item Ruangan Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Item Ruangan By Id',
        },
      },
    },
    put: {
      tags: ['Item Ruangan'],
      summary: 'Update Data Item Ruangan',
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
          description: 'Item Ruangan Id',
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
          description: 'Update Data Item Ruangan',
        },
      },
    },
    delete: {
      tags: ['Item Ruangan'],
      summary: 'Delete Item Ruangan By Id',
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
          description: 'Item Ruangan Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Item Ruangan By Id',
        },
      },
    },
  },
}
