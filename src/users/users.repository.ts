import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserResponseDto } from './dto'

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  async findByNickname(nickname: string) {
    return await this.prisma.user.findUnique({ where: { nickname } })
  }

  async create(nickname: string, email: string, password: string): Promise<CreateUserResponseDto> {
    const newUser = await this.prisma.user.create({ data: { nickname, email, password } })
    return { id: newUser.id, nickname: newUser.nickname, email: newUser.email, role: newUser.role }
  }
}
