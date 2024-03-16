import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger'

import { ACCESS_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_EXPIRATION_TIME } from './constants'
import { LoginRequestDto } from './dto'
import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginRequestDto, @Res({ passthrough: true }) res: Response): Promise<void> {
    const { access_token, refresh_token } = await this.authService.login(dto)

    // token들 cookie로 설정
    res.cookie('access_token', access_token, {
      secure: false, // TODO: 인증서 적용 시 true
      httpOnly: true,
      sameSite: 'strict',
      maxAge: ACCESS_TOKEN_EXPIRATION_TIME,
      //   domain: '', // TODO: 배포 시 `.루트 도메인` 설정
      path: '/',
    })
    res.cookie('refresh_token', refresh_token, {
      secure: false, // TODO: 인증서 적용 시 true
      httpOnly: true,
      sameSite: 'strict',
      maxAge: REFRESH_TOKEN_EXPIRATION_TIME,
      //   domain: '', // TODO: 배포 시 `.루트 도메인` 설정
      path: '/',
    })
  }
}
