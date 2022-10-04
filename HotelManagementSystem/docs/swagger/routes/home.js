module.exports = {
  '/home': {
    get: {
      tags: ['Home'],
      summary:
        'Get All Available, Reserved, PlannedToCheckIn, PlannedToCheckOut Total For Today',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      responses: {
        200: {
          description:
            'Get All Available, Reserved, PlannedToCheckIn, PlannedToCheckOut Total For Today',
        },
      },
    },
  },
  '/generate-excel': {
    post: {
      tags: ['Generate Excel'],
      summary: 'Create New Hak Akses',
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
                startDate: {
                  type: 'fulldate',
                  example: '2021-02-18',
                },
                endDate: {
                  type: 'fulldate',
                  example: '2021-02-18',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Create New Hak Akses',
        },
      },
    },
  },
}
