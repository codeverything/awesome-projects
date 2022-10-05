module.exports = {
  '/amenity': {
    get: {
      tags: ['Amenity'],
      summary: 'Get All Amenity',
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
          description: 'Get All Amenity',
        },
      },
    },
    post: {
      tags: ['Amenity'],
      summary: 'Create New Amenity',
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
                jumlah: {
                  type: 'integer',
                },
                idItem: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Amenity',
        },
      },
    },
  },
  '/amenity/{id}': {
    get: {
      tags: ['Amenity'],
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
          description: 'Amenity Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Amenity By Id',
        },
      },
    },
    put: {
      tags: ['Amenity'],
      summary: 'Update Data Amenity',
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
          description: 'Amenity Id',
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
                jumlah: {
                  type: 'integer',
                },
                idItem: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'UpReservasi Amenity',
        },
      },
    },
    delete: {
      tags: ['Amenity'],
      summary: 'Delete Amenity By Id',
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
          description: 'Amenity Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Amenity By Id',
        },
      },
    },
  },
}
