import { ConflictException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { CreateUserRequestDto } from './dto'
import { UsersRepository } from './users.repository'
import { SALT_ROUNDS } from './constants'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS)
  }

  async createUser({ username, email, password }: CreateUserRequestDto) {
    const isExistUsername = !!(await this.usersRepository.findByUsername(username))

    if (isExistUsername) {
      throw new ConflictException('Duplicated username')
    }

    const isExistEmail = !!(await this.usersRepository.findByEmail(email))

    if (isExistEmail) {
      throw new ConflictException('Duplicated email')
    }

    const hashedPassword = await this.hashPassword(password)
    await this.usersRepository.create(username, email, hashedPassword)
  }
}
