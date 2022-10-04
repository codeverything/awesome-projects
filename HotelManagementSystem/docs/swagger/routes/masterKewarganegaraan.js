module.exports = {
  '/master-kewarganegaraan': {
    get: {
      tags: ['Master Kewarganegaraan'],
      summary: 'Get All Master Kewarganegaraan',
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
          description: 'Get All Master Kewarganegaraan',
        },
      },
    },
    post: {
      tags: ['Master Kewarganegaraan'],
      summary: 'Create New Master Kewarganegaraan',
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
          description: 'Create New Master Kewarganegaraan',
        },
      },
    },
  },
  '/master-kewarganegaraan/{id}': {
    get: {
      tags: ['Master Kewarganegaraan'],
      summary: 'Get Master Kewarganegaraan By Id',
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
          description: 'Master Kewarganegaraan Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master Kewarganegaraan By Id',
        },
      },
    },
    put: {
      tags: ['Master Kewarganegaraan'],
      summary: 'Update Data Master Kewarganegaraan',
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
          description: 'Master Kewarganegaraan Id',
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
          description: 'Update Data Master Kewarganegaraan',
        },
      },
    },
    delete: {
      tags: ['Master Kewarganegaraan'],
      summary: 'Delete Master Kewarganegaraan By Id',
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
          description: 'Master Kewarganegaraan Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master Kewarganegaraan By Id',
        },
      },
    },
  },
}
