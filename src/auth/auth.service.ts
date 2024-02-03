import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UsersRepository } from 'src/users/users.repository'
import { AuthTokensDto, LoginRequestDto } from './dto'
import * as dayjs from 'dayjs'

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository, private jwtService: JwtService) {}

  async login({ email, password }: LoginRequestDto): Promise<AuthTokensDto> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const isPasswordValidated = await bcrypt.compare(password, user.password)

    if (!isPasswordValidated) {
      throw new UnauthorizedException('Invalid email or password')
    }

    // TODO: iss - 서버 배포 시 루트 도메인 사용
    return {
      access_token: this.jwtService.sign({
        sub: user.id,
        iat: dayjs().unix(),
        exp: dayjs().add(1, 'hour').unix(),
        user_role: user.role,
      }),
      refresh_token: this.jwtService.sign({
        sub: user.id,
        iat: dayjs().unix(),
        exp: dayjs().add(7, 'day').unix(),
      }),
    }
  }
}
