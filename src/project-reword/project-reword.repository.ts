import { PrismaService } from '../prisma/prisma.service'
import { CreateProjectRewordRequestDto, ProjectRewordResponseDto, UpdateProjectRewordRequestDto } from './dto'
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

  async getManyWithTotal({
    projectId,
    skip,
    take,
  }: {
    projectId: number
    skip: number
    take: number
  }): Promise<[ProjectRewordResponseDto[], number]> {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.projectReword.findMany({
        skip,
        take,
        where: { project_id: projectId },
        select: {
          id: true,
          title: true,
          description: true,
          expected_delivery_date: true,
          amount: true,
          limit: true,
          project_id: true,
        },
      }),
      this.prisma.projectReword.count(),
    ])

    return [items, total]
  }

  async getOneById(rewordId: number): Promise<ProjectRewordResponseDto> {
    return this.prisma.projectReword.findUnique({
      where: { id: rewordId },
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

  async update(
    rewordId: number,
    { title, description, expected_delivery_date, amount, limit }: UpdateProjectRewordRequestDto,
  ): Promise<ProjectRewordResponseDto> {
    return this.prisma.projectReword.update({
      where: { id: rewordId },
      data: { title, description, expected_delivery_date, amount, limit },
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
