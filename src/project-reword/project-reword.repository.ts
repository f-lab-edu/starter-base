import { PrismaService } from '../prisma/prisma.service'
import { CreateProjectRewordRequestDto, ProjectRewordResponseDto } from './dto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ProjectRewordRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    projectId: number,
    { title, description, expected_delivery_date, amount, limit }: CreateProjectRewordRequestDto,
  ): Promise<ProjectRewordResponseDto> {
    return this.prisma.projectReword.create({
      data: { title, description, expected_delivery_date, amount, limit, project_id: projectId },
      select: {
        id: true,
        title: true,
        description: true,
        expected_delivery_date: true,
        amount: true,
        limit: true,
        project_id: true,
      },
    })
  }
}
