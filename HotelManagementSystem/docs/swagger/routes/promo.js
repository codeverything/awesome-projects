module.exports = {
  '/check-promo': {
    post: {
      tags: ['Promo'],
      security: [
        {
          auth_token: [],
        },
      ],
      summary: 'Check Promo',
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                kode: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Kode Promo Berhasil Di input',
        },
      },
    },
  },
  '/promo': {
    get: {
      tags: ['Promo'],
      summary: 'Get All Promo',
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
          description: 'Get All Promo',
        },
      },
    },
    post: {
      tags: ['Promo'],
      summary: 'Create New Promo',
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
                kode: {
                  type: 'string',
                },
                kuota: {
                  type: 'integer',
                },
                tanggalMulai: {
                  type: 'string',
                  format: 'fulldate',
                },
                tanggalSelesai: {
                  type: 'string',
                  format: 'fulldate',
                },
                nilai: {
                  type: 'integer',
                },
                MasterTipePromoId: {
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
          description: 'Create New Promo',
        },
      },
    },
  },
  '/promo/{id}': {
    get: {
      tags: ['Promo'],
      summary: 'Get Promo By Id',
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
          description: 'Promo Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Promo By Id',
        },
      },
    },
    put: {
      tags: ['Promo'],
      summary: 'Update Data Promo',
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
          description: 'Promo Id',
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
                kode: {
                  type: 'string',
                },
                kuota: {
                  type: 'integer',
                },
                tanggalMulai: {
                  type: 'string',
                  format: 'fulldate',
                },
                tanggalSelesai: {
                  type: 'string',
                  format: 'fulldate',
                },
                nilai: {
                  type: 'integer',
                },
                MasterTipePromoId: {
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
          description: 'Update Data Promo',
        },
      },
    },
    delete: {
      tags: ['Promo'],
      summary: 'Delete Promo By Id',
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
          description: 'Promo Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Promo By Id',
        },
      },
    },
  },
}
