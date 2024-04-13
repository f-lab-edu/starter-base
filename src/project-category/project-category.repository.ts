import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CategoryResponseDto } from './dto'

@Injectable()
export class ProjectCategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string): Promise<CategoryResponseDto> {
    return await this.prisma.projectCategory.create({
      data: { name },
      select: { id: true, name: true },
    })
  }

  async getOne(id: number): Promise<CategoryResponseDto> {
    return await this.prisma.projectCategory.findUnique({
      where: { id },
      select: { id: true, name: true },
    })
  }
}
