import { Body, Controller, Inject, Post, Res } from '@nestjs/common'
import { ClientRedis } from '@nestjs/microservices'
import { Redis } from 'ioredis'
import { Response } from 'express'

import { ACCESS_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_REDIS_KEY } from './constants'
import { LoginRequestDto } from './dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, @Inject('REDIS_SERVICE') private client: ClientRedis) {}

  @Post('login')
  async login(@Body() dto: LoginRequestDto, @Res({ passthrough: true }) res: Response): Promise<void> {
    const { access_token, refresh_token, user_id } = await this.authService.login(dto)

    // token들 cookie로 설정
    res.cookie('access_token', access_token, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: ACCESS_TOKEN_EXPIRATION_TIME,
      //   domain: '', // TODO: 배포 시 `.루트 도메인` 설정
      path: '/',
    })
    res.cookie('refresh_token', refresh_token, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: REFRESH_TOKEN_EXPIRATION_TIME,
      //   domain: '', // TODO: 배포 시 `.루트 도메인` 설정
      path: '/',
    })

    // redis에 refresh token 저장
    const client: Redis = this.client.createClient()
    client.set(`${REFRESH_TOKEN_REDIS_KEY}:${user_id}`, refresh_token, 'PX', REFRESH_TOKEN_EXPIRATION_TIME)
  }
}
