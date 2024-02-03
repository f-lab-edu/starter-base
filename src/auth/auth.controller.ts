import { Body, Controller, Post, Res } from '@nestjs/common'
import { LoginRequestDto } from './dto'
import { AuthService } from './auth.service'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginRequestDto, @Res({ passthrough: true }) res: Response): Promise<void> {
    const { access_token, refresh_token } = await this.authService.login(dto)

    res.cookie('access_token', access_token, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000, // 1hour
      //   domain: '', // TODO: 배포 시 `.루트 도메인` 설정
      path: '/',
    })
    res.cookie('refresh_token', refresh_token, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7day
      //   domain: '', // TODO: 배포 시 `.루트 도메인` 설정
      path: '/',
    })

    return
  }
}
