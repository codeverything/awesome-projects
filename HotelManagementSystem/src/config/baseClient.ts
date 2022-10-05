const BASE_URL = {
  development: 'http://localhost:8090',
  staging: 'https://api-nusa-hotel.ujiaplikasi.com/',
  production: 'http://example.com',
}

const ENV = process.env.NODE_ENV || 'development'

// @ts-ignore
export const BASE_URL_CLIENT = BASE_URL[ENV]
