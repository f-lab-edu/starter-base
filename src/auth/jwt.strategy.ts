import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable } from '@nestjs/common'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'
import { AccessTokenPayload } from './jwt.payload'
import { JwtDto } from './dto'
import { configuration } from 'src/common/config/env'
import { ConfigType } from '@nestjs/config'

const fromAuthCookie = (request: Request) => {
  if (request?.cookies) {
    return request.cookies['access_token']
  }
  return null
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(configuration.KEY) config: ConfigType<typeof configuration>) {
    super({
      jwtFromRequest: fromAuthCookie,
      ignoreExpiration: false,
      secretOrKey: config.node.jwtSecret,
    })
  }

  async validate(payload: AccessTokenPayload): Promise<JwtDto> {
    return { userId: payload.sub, userRole: payload.user_role }
  }
}
