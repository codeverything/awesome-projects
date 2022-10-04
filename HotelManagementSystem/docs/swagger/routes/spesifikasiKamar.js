module.exports = {
  '/spesifikasi-kamar': {
    get: {
      tags: ['Spesifikasi Kamar'],
      summary: 'Get All Spesifikasi Kamar',
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
          description: 'Get All Spesifikasi Kamar',
        },
      },
    },
    post: {
      tags: ['Spesifikasi Kamar'],
      summary: 'Create New Spesifikasi Kamar',
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
                nama: 'string',
                MasterTipeKamarId: 'string',
                defaultHargaKamar: 'number',
                MasterTipeKasurId: 'string',
                MasterSpecialRequirementId: 'string',
                maxTamu: 'number',
                linen: ['uuid'],
                itemKamar: ['uuid'],
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Spesifikasi Kamar',
        },
      },
    },
  },
  '/spesifikasi-kamar/{id}': {
    get: {
      tags: ['Spesifikasi Kamar'],
      summary: 'Get Spesifikasi Kamar By Id',
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
          description: 'Spesifikasi Kamar Id',
        },
      ],
      responses: {
        200: {
          description: 'Get Spesifikasi Kamar By Id',
        },
      },
    },
    put: {
      tags: ['Spesifikasi Kamar'],
      summary: 'Update Data Spesifikasi Kamar',
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
          description: 'Spesifikasi Kamar Id',
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
                nama: 'string',
                MasterTipeKamarId: 'string',
                defaultHargaKamar: 'number',
                MasterTipeKasurId: 'string',
                MasterSpecialRequirementId: 'string',
                maxTamu: 'number',
                linen: ['uuid'],
                itemKamar: ['uuid'],
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Update Data Spesifikasi Kamar',
        },
      },
    },
    delete: {
      tags: ['Spesifikasi Kamar'],
      summary: 'Delete Spesifikasi Kamar By Id',
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
          description: 'Spesifikasi Kamar Id',
        },
      ],
      responses: {
        200: {
          description: 'Delete Spesifikasi Kamar By Id',
        },
      },
    },
  },
}
