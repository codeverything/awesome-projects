module.exports = {
  '/late-check-out/{id}': {
    get: {
      tags: ['Late Check Out'],
      summary: 'Get Late Check Out By Id',
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
          description: 'Late Check Out Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Late Check Out By Id',
        },
      },
    },
    put: {
      tags: ['Late Check Out'],
      summary: 'Update Data Late Check Out',
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
          description: 'Late Check Out Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                mulaiLateCheckOut: {
                  type: 'string',
                  format: 'fulldate',
                },
                mulaiLateCheckOutFullDay: {
                  type: 'string',
                  format: 'fulldate',
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
          description: 'Update Data Late Check Out',
        },
      },
    },
    delete: {
      tags: ['Late Check Out'],
      summary: 'Delete Late Check Out By Id',
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
          description: 'Late Check Out Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Late Check Out By Id',
        },
      },
    },
  },
}
