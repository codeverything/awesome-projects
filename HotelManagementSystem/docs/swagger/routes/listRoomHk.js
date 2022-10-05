module.exports = {
  '/room-hk': {
    get: {
      tags: ['List Room HK'],
      summary: 'Get All List Room HK',
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
          description: 'Get All List Room HK List',
        },
      },
    },
  },
  '/detail-room-hk/{id}': {
    get: {
      tags: ['List Room HK'],
      summary: 'Get Detail Room HK By Room Id',
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
          description: 'List Room HK Id',
        },
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
          description: 'Get Detail Room HK By Id',
        },
      },
    },
  },
  '/detail-room-linen-hk/{id}': {
    get: {
      tags: ['List Room HK'],
      summary: 'Detail Linen Room by Room Id',
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
            format: 'uuid',
          },
          description: 'List Room HK Id',
        },
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
          description: 'Detail Linen Room by Room Id',
        },
      },
    },
  },
  '/detail-room-item-hk/{id}': {
    get: {
      tags: ['List Room HK'],
      summary: 'Get Detail Item Kamar Room by Room Id',
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
            format: 'uuid',
          },
          description: 'Get Detail Item Kamar Room by Room Id',
        },
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
          description: 'Get Detail Item Kamar Room by Room Id',
        },
      },
    },
  },
  '/detail-room-amenity/{id}': {
    get: {
      tags: ['List Room HK'],
      summary: 'Get Detail Amenity Room by Room Id',
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
          format: 'uuid',
          description: 'List Room HK Id',
        },
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
          description: 'Get Detail Item Kamar Room by Room Id',
        },
      },
    },
  },
  '/detail-room-checker/{id}': {
    get: {
      tags: ['List Room HK'],
      summary: 'Get Item Kamar Room Kerusakan Kehilangan by Room Id',
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
          format: 'uuid',
          description: 'List Room HK Id',
        },
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
          description: 'Get Item Kamar Room Kerusakan Kehilangan by Room Id',
        },
      },
    },
  },
  '/linen-by-spesifikasi/{id}': {
    get: {
      tags: ['List Room HK'],
      summary: 'Get List Room HK By Id',
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
          format: 'uuid',
          description: 'List Room HK Id',
        },
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
          description: 'Get List Room HK By Id',
        },
      },
    },
  },
  '/lost-and-found/{id}': {
    get: {
      tags: ['List Room HK'],
      summary: 'Get List Room HK By Id',
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
          format: 'uuid',
          description: 'List Room HK Id',
        },
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
          description: 'Get List Room HK By Id',
        },
      },
    },
  },
  '/log-kamar/{id}': {
    get: {
      tags: ['List Room HK'],
      summary: 'Get List Room HK By Id',
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
          format: 'uuid',
          description: 'List Room HK Id',
        },
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
          description: 'Get List Room HK By Id',
        },
      },
    },
  },
  '/log-linen/{id}': {
    get: {
      tags: ['List Room HK'],
      summary: 'Get List Room HK By Id',
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
          format: 'uuid',
          description: 'List Room HK Id',
        },
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
          description: 'Get List Room HK By Id',
        },
      },
    },
  },
  '/detail-room-linen/{id}': {
    get: {
      tags: ['List Room HK'],
      summary: 'Get List Room HK By Id',
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
          format: 'uuid',
          description: 'List Room HK Id',
        },
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
          description: 'Get One linen HK By LinenSupply iD',
        },
      },
    },
  },
  '/linen-supply/{id}': {
    get: {
      tags: ['List Room HK'],
      summary: 'Get One linen HK By LinenSupply iD',
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
          format: 'uuid',
          description: 'List Room HK Id',
        },
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
          description: 'Get One linen HK By LinenSupply iD',
        },
      },
    },
  },
  '/amenity-supply/{id}': {
    get: {
      tags: ['List Room HK'],
      summary: 'Get One amenity HK By amenitySupply iD',
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
          format: 'uuid',
          description: 'List Room HK Id',
        },
      ],
      responses: {
        200: {
          description: 'Get One amenity HK By amenitySupply iD',
        },
      },
    },
  },
  '/lost-and-found-supply/{id}': {
    get: {
      tags: ['List Room HK'],
      summary: 'Get One lost and found HK By id',
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
          format: 'uuid',
          description: 'Get One lost and found HK By id',
        },
      ],
      responses: {
        200: {
          description: 'Get One lost and found HK By id',
        },
      },
    },
  },
}
