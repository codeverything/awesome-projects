module.exports = {
  '/early-check-in/{id}': {
    get: {
      tags: ['Early Check In'],
      summary: 'Get Early Check In By Id',
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
          description: 'Early Check In Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Early Check In By Id',
        },
      },
    },
    put: {
      tags: ['Early Check In'],
      summary: 'Update Data Early Check In',
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
          description: 'Early Check In Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                batasAkhirCheckIn: {
                  type: 'string',
                  format: 'fulldate',
                },
                batasAkhirCheckOut: {
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
          description: 'Update Data Early Check In',
        },
      },
    },
    delete: {
      tags: ['Early Check In'],
      summary: 'Delete Early Check In By Id',
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
          description: 'Early Check In Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Early Check In By Id',
        },
      },
    },
  },
}
