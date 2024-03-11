import { JwtDto } from 'src/auth/dto'

declare global {
  namespace Express {
    // express req.user 객체 type 지정
    export interface User extends JwtDto {}
  }
}
