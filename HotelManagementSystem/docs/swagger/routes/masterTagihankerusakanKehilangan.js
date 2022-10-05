module.exports = {
  '/master-tagihan-kerusakan-kehilangan': {
    get: {
      tags: ['Master Tagihan Kerusakan kehilangan'],
      summary: 'Get All Master Tagihan Kerusakan kehilangan',
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
          description: 'Get All Master Tagihan Kerusakan kehilangan',
        },
      },
    },
    post: {
      tags: ['Master Tagihan Kerusakan kehilangan'],
      summary: 'Create New Master Tagihan Kerusakan kehilangan',
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
          description: 'Create New Master Tagihan Kerusakan kehilangan',
        },
      },
    },
  },
  '/master-tagihan-kerusakan-kehilangan/{id}': {
    get: {
      tags: ['Master Tagihan Kerusakan kehilangan'],
      summary: 'Get Master Tagihan Kerusakan kehilangan By Id',
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
          description: 'Master Tagihan Kerusakan kehilangan Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Tagihan Kerusakan kehilangan By Id',
        },
      },
    },
    put: {
      tags: ['Master Tagihan Kerusakan kehilangan'],
      summary: 'Update Data Master Tagihan Kerusakan kehilangan',
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
          description: 'Master Tagihan Kerusakan kehilangan Id',
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
          description: 'Update Data Master Tagihan Kerusakan kehilangan',
        },
      },
    },
    delete: {
      tags: ['Master Tagihan Kerusakan kehilangan'],
      summary: 'Delete Master Tagihan Kerusakan kehilangan By Id',
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
          description: 'Master Tagihan Kerusakan kehilangan Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Tagihan Kerusakan kehilangan By Id',
        },
      },
    },
  },
}
