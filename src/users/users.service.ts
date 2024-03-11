import { ConflictException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { CreateUserRequestDto, CreateUserResponseDto } from './dto'
import { UsersRepository } from './users.repository'
import { SALT_ROUNDS } from './constants'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS)
  }

  async createUser({ nickname, email, password }: CreateUserRequestDto): Promise<CreateUserResponseDto> {
    const isExistNickname = !!(await this.usersRepository.findByNickname(nickname))

    if (isExistNickname) {
      throw new ConflictException('Duplicated nickname')
    }

    const isExistEmail = !!(await this.usersRepository.findByEmail(email))

    if (isExistEmail) {
      throw new ConflictException('Duplicated email')
    }

    const hashedPassword = await this.hashPassword(password)
    return await this.usersRepository.create(nickname, email, hashedPassword)
  }
}
