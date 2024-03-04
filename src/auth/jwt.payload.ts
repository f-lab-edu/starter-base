import { UserRole } from '@prisma/client'

export interface AccessTokenPayload {
  sub: number
  jti: string
  iat: number
  exp: number
  user_role: UserRole
}

export interface RefreshTokenPayload {
  sub: number
  jti: string
  iat: number
  exp: number
}
