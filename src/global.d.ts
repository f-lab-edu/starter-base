import { JwtDto } from 'src/auth/dto'

declare global {
  namespace Express {
    // express req.user 객체 type 지정
    export interface User extends JwtDto {}
  }

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'local' | 'prod'

      REDIS_HOST: string
      REDIS_PORT: string

      NODE_PORT: string
      IS_COOKIE_SECURE: string // boolean
      JWT_SECRET: string
    }
  }
}
