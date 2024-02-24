import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } })
  }

  async create(username: string, email: string, password: string) {
    return this.prisma.user.create({ data: { username, email, password } })
  }
}
