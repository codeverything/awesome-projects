module.exports = {
  '/auth/sign-up': {
    post: {
      tags: ['Auth'],
      summary: 'Create New Account',
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                fullName: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                newPassword: {
                  type: 'string',
                },
                confirmNewPassword: {
                  type: 'string',
                },
                phone: {
                  type: 'string',
                },
              },
              required: [
                'fullName',
                'email',
                'newPassword',
                'confirmNewPassword',
                'phone',
              ],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Create New Account',
        },
      },
    },
  },
  '/auth/sign-in': {
    post: {
      tags: ['Auth'],
      summary: 'Login Your Account',
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
              },
              required: ['email', 'password'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Login Your Account',
        },
      },
    },
  },
  '/profile': {
    get: {
      tags: ['Auth'],
      summary: 'Get Profile',
      produces: ['application/json'],
      security: [
        {
          auth_token: [],
        },
      ],
      responses: {
        200: {
          description: 'Get Profile',
        },
      },
    },
    put: {
      tags: ['Auth'],
      summary: 'Update Own Profile',
      produces: ['application/json'],
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
                imagePath: {
                  type: 'string',
                  format: 'binary',
                },
                fullName: {
                  type: 'string',
                },
                nickName: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
                newPassword: {
                  type: 'string',
                },
                confirmNewPassword: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Success update Data',
        },
      },
    },
  },
}
