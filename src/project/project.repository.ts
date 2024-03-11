import { Project as ProjectScheme, ProjectStatus } from '@prisma/client'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Project } from './domain/project'
import { CreateProjectResponseDto, ProjectSummaryDto } from './dto'

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

  async create(_project: Project): Promise<CreateProjectResponseDto> {
    if (!_project.created_by_id) {
      throw new InternalServerErrorException('Required user id')
    }

    const project: Omit<ProjectScheme, 'created_at' | 'updated_at' | 'id'> = {
      status: _project.status,
      title: _project.title,
      summary: _project.summary,
      description: _project.description,
      thumbnail_url: _project.thumbnail_url,
      target_amount: _project.target_amount,
      collected_amount: _project.collected_amount,
      created_by_id: _project.created_by_id,
      category_id: _project.category_id,
    }

    const newProject = await this.prisma.project.create({
      data: project,
    })

    return {
      id: newProject.id,
      status: newProject.status,
      title: newProject.title,
      summary: newProject.summary,
      description: newProject.description,
      thumbnail_url: newProject.thumbnail_url,
      target_amount: newProject.target_amount,
      collected_amount: newProject.collected_amount,
      created_by_id: newProject.created_by_id,
      category_id: newProject.category_id,
    }
  }

  async getProjectsWithTotal({ skip, take }: { skip: number; take: number }): Promise<[ProjectSummaryDto[], number]> {
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
}
