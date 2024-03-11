import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'
import { AccessTokenPayload } from './jwt.payload'
import { JwtDto } from './dto'

const fromAuthCookie = (request: Request) => {
  if (request?.cookies) {
    return request.cookies['access_token']
  }
  return null
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: fromAuthCookie,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate(payload: AccessTokenPayload): Promise<JwtDto> {
    return { userId: payload.sub, userRole: payload.user_role }
  }
}
