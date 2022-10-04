module.exports = {
  '/informasi-orang': {
    get: {
      tags: ['Informasi Orang'],
      summary: 'Get All Informasi Orang',
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
          description: 'Get All Informasi Orang',
        },
      },
    },
    post: {
      tags: ['Informasi Orang'],
      summary: 'Create New Informasi Orang',
      security: [
        {
          auth_token: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                dataString: {
                  type: 'string',
                  description:
                    'example: {"nama":"testing","MasterTipeIdentitasId":"3c63406d-7cd3-44de-a696-a26d80430bf1","nomorIdentitas":123456789,"CityId":3578,"tanggalLahir":"2021-03-01T00:00:00.000Z","alamat":"test","MasterJenisKelaminId":"33458d50-29d7-43e9-b3ee-de1e0856020d","email":"andikaperdana95@gmail.com","nomorHandphone":81333653541,"MasterStatusPerkawinanId":"ba59eda7-ab00-4c74-93ce-875b3d1154ca","MasterAgamaId":"74417c65-fd4d-4ed6-8cf5-722ff7d61f50","MasterKewarganegaraanId":"29b0978d-586e-415f-aeb2-97c834007a8e","pekerjaan":"swasta","MasterTipeTamuId":"b7c7f459-6b24-486d-ad7f-3c7464004922","jabatan":null,"blobURLs":{"fileIdentitas":"blob:http://localhost:3333/f1a414e2-4c23-4ab8-9858-714421c9cdd6","fileBuktiMenikah":"blob:http://localhost:3333/655f8d77-e6d9-4d20-950a-01b64b81d42b"},"fileIdentitas":{"uid":"rc-upload-1614565689652-15"},"fileBuktiMenikah":{"uid":"rc-upload-1614565689652-17"}}',
                },
                fileIdentitas: {
                  type: 'string',
                  format: 'binary',
                },
                fileBuktiMenikah: {
                  type: 'string',
                  format: 'binary',
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Create New Informasi Orang',
          },
        },
      },
    },
    '/informasi-orang/{id}': {
      get: {
        tags: ['Informasi Orang'],
        summary: 'Get User By Id',
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
            description: 'Informasi Orang Id',
          },
        ],
        responses: {
          200: {
            description: 'Get Informasi Orang By Id',
          },
        },
      },
      put: {
        tags: ['Informasi Orang'],
        summary: 'Update Data Informasi Orang',
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
            description: 'Informasi Orang Id',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  dataString: {
                    type: 'string',
                    description:
                      'example: {"nama":"testing","MasterTipeIdentitasId":"3c63406d-7cd3-44de-a696-a26d80430bf1","nomorIdentitas":123456789,"CityId":3578,"tanggalLahir":"2021-03-01T00:00:00.000Z","alamat":"test","MasterJenisKelaminId":"33458d50-29d7-43e9-b3ee-de1e0856020d","email":"andikaperdana95@gmail.com","nomorHandphone":81333653541,"MasterStatusPerkawinanId":"ba59eda7-ab00-4c74-93ce-875b3d1154ca","MasterAgamaId":"74417c65-fd4d-4ed6-8cf5-722ff7d61f50","MasterKewarganegaraanId":"29b0978d-586e-415f-aeb2-97c834007a8e","pekerjaan":"swasta","MasterTipeTamuId":"b7c7f459-6b24-486d-ad7f-3c7464004922","jabatan":null,"blobURLs":{"fileIdentitas":"blob:http://localhost:3333/f1a414e2-4c23-4ab8-9858-714421c9cdd6","fileBuktiMenikah":"blob:http://localhost:3333/655f8d77-e6d9-4d20-950a-01b64b81d42b"},"fileIdentitas":{"uid":"rc-upload-1614565689652-15"},"fileBuktiMenikah":{"uid":"rc-upload-1614565689652-17"}}',
                  },
                  fileIdentitas: {
                    type: 'string',
                    format: 'binary',
                  },
                  fileBuktiMenikah: {
                    type: 'string',
                    format: 'binary',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Update Data Informasi Orang',
          },
        },
      },
      delete: {
        tags: ['Informasi Orang'],
        summary: 'Delete Informasi Orang By Id',
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
            description: 'Informasi Orang Id',
          },
        ],
        responses: {
          200: {
            description: 'Delete Informasi Orang By Id',
          },
        },
      },
    },
  },
}
