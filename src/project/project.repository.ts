import { Project as ProjectScheme, ProjectStatus } from '@prisma/client'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Project } from './domain/project'
import { ProjectResponseDto, ProjectSummaryDto, UpdateProjectRequestDto } from './dto'

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getDraftProjectCount(created_by_id: number): Promise<number> {
    return this.prisma.project.count({
      where: {
        created_by_id,
        status: ProjectStatus.DRAFT,
      },
    })
  }

  async create({
    status,
    title,
    summary,
    description,
    thumbnail_url,
    target_amount,
    created_by_id,
    category_id,
  }: Project): Promise<ProjectResponseDto> {
    if (!created_by_id) {
      throw new InternalServerErrorException('Required user id')
    }

    const project: Omit<ProjectScheme, 'created_at' | 'updated_at' | 'collected_amount' | 'id'> = {
      status: status,
      title: title,
      summary: summary,
      description: description,
      thumbnail_url: thumbnail_url,
      target_amount: target_amount,
      created_by_id: created_by_id,
      category_id: category_id,
    }

    return this.prisma.project.create({
      data: project,
      select: {
        id: true,
        status: true,
        title: true,
        summary: true,
        description: true,
        thumbnail_url: true,
        target_amount: true,
        collected_amount: true,
        created_by: { select: { id: true, nickname: true } },
        category: { select: { id: true, name: true } },
      },
    })
  }

  async getManyWithTotal({ skip, take }: { skip: number; take: number }): Promise<[ProjectSummaryDto[], number]> {
    const [items, total] = await this.prisma.$transaction([
      this.prisma.project.findMany({
        skip,
        take,
        select: {
          id: true,
          status: true,
          title: true,
          summary: true,
          thumbnail_url: true,
          target_amount: true,
          collected_amount: true,
          category: { select: { id: true, name: true } },
          created_by: { select: { id: true, nickname: true } },
        },
      }),
      this.prisma.project.count(),
    ])

    return [items, total]
  }

  async getOne(id: number): Promise<ProjectResponseDto> {
    return this.prisma.project.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        title: true,
        summary: true,
        description: true,
        thumbnail_url: true,
        target_amount: true,
        collected_amount: true,
        created_by: { select: { id: true, nickname: true } },
        category: { select: { id: true, name: true } },
      },
    })
  }

  async getCreatorId(projectId: number) {
    return this.prisma.project.findUnique({
      where: { id: projectId },
      select: { created_by_id: true },
    })
  }

  async update(
    id: number,
    { title, summary, description, thumbnail_url, target_amount, category_id }: UpdateProjectRequestDto,
  ): Promise<ProjectResponseDto> {
    return this.prisma.project.update({
      where: { id },
      data: { title, summary, description, thumbnail_url, target_amount, category_id },
      select: {
        id: true,
        status: true,
        title: true,
        summary: true,
        description: true,
        thumbnail_url: true,
        target_amount: true,
        collected_amount: true,
        created_by: { select: { id: true, nickname: true } },
        category: { select: { id: true, name: true } },
      },
    })
  }

  async updateStatus(id: number, status: ProjectStatus): Promise<ProjectResponseDto> {
    return this.prisma.project.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        status: true,
        title: true,
        summary: true,
        description: true,
        thumbnail_url: true,
        target_amount: true,
        collected_amount: true,
        created_by: { select: { id: true, nickname: true } },
        category: { select: { id: true, name: true } },
      },
    })
  }
}
