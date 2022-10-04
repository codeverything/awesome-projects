module.exports = {
  '/master-tipe-kamar': {
    get: {
      tags: ['Master Tipe Kamar'],
      summary: 'Get All Master Tipe Kamar',
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
          description: 'Get All Master Tipe Kamar',
        },
      },
    },
    post: {
      tags: ['Master Tipe Kamar'],
      summary: 'Create New Master Tipe Kamar',
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
          description: 'Create New Master Tipe Kamar',
        },
      },
    },
  },
  '/master-tipe-kamar/{id}': {
    get: {
      tags: ['Master Tipe Kamar'],
      summary: 'Get Master Tipe Kamar By Id',
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
          description: 'Master Tipe Kamar Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Tipe Kamar By Id',
        },
      },
    },
    put: {
      tags: ['Master Tipe Kamar'],
      summary: 'Update Data Master Tipe Kamar',
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
          description: 'Master Tipe Kamar Id',
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
          description: 'Update Data Master Tipe Kamar',
        },
      },
    },
    delete: {
      tags: ['Master Tipe Kamar'],
      summary: 'Delete Master Tipe Kamar By Id',
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
          description: 'Master Tipe Kamar Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Tipe Kamar By Id',
        },
      },
    },
  },
}
