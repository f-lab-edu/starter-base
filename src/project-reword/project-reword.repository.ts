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

  async getMany({ projectId, ids }: { projectId: number; ids?: number[] }): Promise<ProjectRewordResponseDto[]> {
    return this.prisma.projectReword.findMany({
      where: { project_id: projectId, id: { in: ids } },
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

  async delete(rewordId: number): Promise<void> {
    await this.prisma.projectReword.delete({ where: { id: rewordId } })
  }
}
