module.exports = {
  '/shift': {
    get: {
      tags: ['Shift'],
      summary: 'Get All Shift',
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
          description: 'Get All Shift',
        },
      },
    },
    post: {
      tags: ['Shift'],
      summary: 'Create New Shift',
      security: [
        {
          auth_token: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                nama: {
                  type: 'string',
                },
              },
              example: {
                nama: 'fsdsada',
                LogWaktuShift: {
                  waktuMulai: '00:31',
                  waktuSelesai: '00:31',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Shift',
        },
      },
    },
  },
  '/shift/{id}': {
    get: {
      tags: ['Shift'],
      summary: 'Get Reservasi By Id',
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
            format: 'uuid',
          },
          description: 'Shift Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Shift By Id',
        },
      },
    },
    put: {
      tags: ['Shift'],
      summary: 'Update Data Shift',
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
          description: 'Shift Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                nama: {
                  type: 'string',
                },
              },
              example: {
                nama: 'fsdsada',
                LogWaktuShift: {
                  waktuMulai: '00:31',
                  waktuSelesai: '00:31',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'UpReservasi Shift',
        },
      },
    },
    delete: {
      tags: ['Shift'],
      summary: 'Delete Shift By Id',
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
          description: 'Shift Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Shift By Id',
        },
      },
    },
  },
}
