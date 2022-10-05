module.exports = {
  '/detail-invoice/{id}': {
    get: {
      tags: ['Invoice'],
      summary: 'Get Item Kamar By Id',
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
          description: 'Reservasi Id',
        },
      ],
      responses: {
        200: {
          description: 'Get data Invoice By Reservasi Id',
        },
      },
    },
  },
  '/invoice-refund/{id}': {
    post: {
      tags: ['Invoice'],
      summary: 'Get Item Kamar By Id',
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
          description: 'Reservasi Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                MasterItemPembayaranId: {
                  type: 'string',
                  format: 'uuid',
                },
                MasterTipePembayaranId: {
                  type: 'string',
                  format: 'uuid',
                },
                nilai: {
                  type: 'integer',
                },
                keterangan: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Create Invoice Refund By Reservasi Id',
        },
      },
    },
  },
  '/invoice-pembayaran/{id}': {
    post: {
      tags: ['Invoice'],
      summary: 'Get Item Kamar By Id',
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
          description: 'Reservasi Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                MasterItemPembayaranId: {
                  type: 'string',
                  format: 'uuid',
                },
                MasterTipePembayaranId: {
                  type: 'string',
                  format: 'uuid',
                },
                nilai: {
                  type: 'integer',
                },
                keterangan: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Create Invoice Pembayaran By Reservasi Id',
        },
      },
    },
  },
  '/invoice-tambahan/{id}': {
    post: {
      tags: ['Invoice'],
      summary: 'Get Item Kamar By Id',
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
          description: 'Reservasi Id',
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                MasterFasilitasTambahanId: {
                  type: 'string',
                  format: 'uuid',
                },
                jumlah: {
                  type: 'integer',
                  minimum: 0,
                },
                jumlahHarga: {
                  type: 'integer',
                },
                nilaiHarga: {
                  type: 'integer',
                },
                keterangan: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Create Invoice Tambahan By Reservasi Id',
        },
      },
    },
  },
}
