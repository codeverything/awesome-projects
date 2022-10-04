module.exports = {
  '/calendar/room-reservation': {
    get: {
      tags: ['Calendar'],
      summary: 'Get All Kamar Available By Rentang tanggal',
      security: [
        {
          auth_token: [],
        },
      ],
      parameters: [
        {
          in: 'query',
          name: 'tanggalCheckIn',
          schema: {
            type: 'full-date',
          },
          description: 'Date Awal',
        },
        {
          in: 'query',
          name: 'tanggalCheckOut',
          schema: {
            type: 'full-date',
          },
          description: 'Date Akhir',
        },
      ],
      responses: {
        200: {
          description: 'Get All Total Check Available',
        },
      },
    },
  },
}
