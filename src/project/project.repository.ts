import { Project as ProjectScheme, ProjectStatus } from '@prisma/client'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Project } from './domain/project'

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

  async save(_project: Project): Promise<void> {
    if (!_project.created_by_id) {
      throw new InternalServerErrorException('Required user id')
    }

    const project: Omit<ProjectScheme, 'created_at' | 'updated_at'> = {
      id: _project.id || -1,
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

    await this.prisma.project.upsert({
      where: { id: project.id },
      create: project,
      update: project,
    })
  }
}
