import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UsersRepository } from 'src/users/users.repository'
import { LoginRequestDto } from './dto'

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository, private jwtService: JwtService) {}

  async login({ email, password }: LoginRequestDto) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const isPasswordValidated = await bcrypt.compare(password, user.password)

    if (!isPasswordValidated) {
      throw new UnauthorizedException('Invalid email or password')
    }

    return {
      // TODO: payload 형식 정의
      access_token: this.jwtService.sign({ sub: user.id }),
    }
  }
}
