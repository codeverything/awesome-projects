module.exports = {
  '/item-kamar': {
    get: {
      tags: ['Item Kamar'],
      summary: 'Get All Item Kamar',
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
          description: 'Get All Item Kamar',
        },
      },
    },
    post: {
      tags: ['Item Kamar'],
      summary: 'Create New Item Kamar',
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
                harga: {
                  type: 'integer',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Item Kamar',
        },
      },
    },
  },
  '/item-kamar/{id}': {
    get: {
      tags: ['Item Kamar'],
      summary: 'Get Item Kamar By Id',
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
          description: 'Item Kamar Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Item Kamar By Id',
        },
      },
    },
    put: {
      tags: ['Item Kamar'],
      summary: 'Update Data Item Kamar',
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
          description: 'Item Kamar Id',
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
                harga: {
                  type: 'integer',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Update Data Item Kamar',
        },
      },
    },
    delete: {
      tags: ['Item Kamar'],
      summary: 'Delete Item Kamar By Id',
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
          description: 'Item Kamar Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Item Kamar By Id',
        },
      },
    },
  },
}
