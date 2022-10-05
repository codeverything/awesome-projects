module.exports = {
  '/master-tipe-tamu': {
    get: {
      tags: ['Master Tipe Tamu'],
      summary: 'Get All Master Tipe Tamu',
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
          description: 'Get All Master Tipe Tamu',
        },
      },
    },
    post: {
      tags: ['Master Tipe Tamu'],
      summary: 'Create New Master Tipe Tamu',
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
          description: 'Create New Master Tipe Tamu',
        },
      },
    },
  },
  '/master-tipe-tamu/{id}': {
    get: {
      tags: ['Master Tipe Tamu'],
      summary: 'Get Master Tipe Tamu By Id',
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
          description: 'Master Tipe Tamu Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Tipe Tamu By Id',
        },
      },
    },
    put: {
      tags: ['Master Tipe Tamu'],
      summary: 'Update Data Master Tipe Tamu',
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
          description: 'Master Tipe Tamu Id',
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
          description: 'Update Data Master Tipe Tamu',
        },
      },
    },
    delete: {
      tags: ['Master Tipe Tamu'],
      summary: 'Delete Master Tipe Tamu By Id',
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
          description: 'Master Tipe Tamu Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Tipe Tamu By Id',
        },
      },
    },
  },
}
