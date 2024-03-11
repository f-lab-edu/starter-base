import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCategoryResponseDto } from './dto'

@Injectable()
export class ProjectCategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string): Promise<CreateCategoryResponseDto> {
    const newCategory = await this.prisma.projectCategory.create({ data: { name } })
    return {
      id: newCategory.id,
      name: newCategory.name,
    }
  }
}
