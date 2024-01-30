import { Body, Controller, Post } from '@nestjs/common'
import { LoginRequestDto } from './dto'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginRequestDto) {
    return this.authService.login(dto)
  }
}
