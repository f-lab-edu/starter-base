import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async findByNickname(nickname: string) {
    return this.prisma.user.findUnique({ where: { nickname } })
  }

  async create(nickname: string, email: string, password: string) {
    return this.prisma.user.create({ data: { nickname, email, password } })
  }
}
