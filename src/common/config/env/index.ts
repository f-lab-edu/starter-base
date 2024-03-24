import { registerAs } from '@nestjs/config'

export const configuration = registerAs('config', () => ({
  node: {
    port: parseInt(process.env.NODE_PORT, 10) || 8000,
    isCookieSecure: process.env.IS_COOKIE_SECURE !== 'false',
    jwtSecret: process.env.JWT_SECRET,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
  },
}))
