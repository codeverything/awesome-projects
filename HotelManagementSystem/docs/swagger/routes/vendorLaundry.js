module.exports = {
  '/vendor-laundry': {
    get: {
      tags: ['Vendor Laundry'],
      summary: 'Get All Vendor Laundry',
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
          description: 'Get All Vendor Laundry',
        },
      },
    },
    post: {
      tags: ['Vendor Laundry'],
      summary: 'Create New Vendor Laundry',
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
                idVendor: {
                  type: 'string',
                },
                nama: {
                  type: 'string',
                },
                alamat: {
                  type: 'string',
                },
                kontak: {
                  type: 'string',
                },
                MasterJenisVendorLaundryId: {
                  type: 'string',
                  format: 'uuid',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Vendor Laundry',
        },
      },
    },
  },
  '/vendor-laundry/{id}': {
    get: {
      tags: ['Vendor Laundry'],
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
          description: 'Vendor Laundry Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Vendor Laundry By Id',
        },
      },
    },
    put: {
      tags: ['Vendor Laundry'],
      summary: 'Update Data Vendor Laundry',
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
          description: 'Vendor Laundry Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                idVendor: {
                  type: 'string',
                },
                nama: {
                  type: 'string',
                },
                alamat: {
                  type: 'string',
                },
                kontak: {
                  type: 'string',
                },
                MasterJenisVendorLaundryId: {
                  type: 'string',
                  format: 'uuid',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'UpReservasi Vendor Laundry',
        },
      },
    },
    delete: {
      tags: ['Vendor Laundry'],
      summary: 'Delete Vendor Laundry By Id',
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
          description: 'Vendor Laundry Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Vendor Laundry By Id',
        },
      },
    },
  },
}
