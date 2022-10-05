module.exports = {
  '/master-ota': {
    get: {
      tags: ['Master OTA'],
      summary: 'Get All Master OTA',
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
          description: 'Get All Master OTA',
        },
      },
    },
    post: {
      tags: ['Master OTA'],
      summary: 'Create New Master OTA',
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
          description: 'Create New Master OTA',
        },
      },
    },
  },
  '/master-ota/{id}': {
    get: {
      tags: ['Master OTA'],
      summary: 'Get Master OTA By Id',
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
          description: 'Master OTA Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Master OTA By Id',
        },
      },
    },
    put: {
      tags: ['Master OTA'],
      summary: 'Update Data Master OTA',
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
          description: 'Master OTA Id',
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
          description: 'Update Data Master OTA',
        },
      },
    },
    delete: {
      tags: ['Master OTA'],
      summary: 'Delete Master OTA By Id',
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
          description: 'Master OTA Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Master OTA By Id',
        },
      },
    },
  },
}
