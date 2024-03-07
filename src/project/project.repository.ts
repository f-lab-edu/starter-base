import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Project } from './domain'

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(project: Project) {
    if (!project.created_by_id) {
      throw new InternalServerErrorException('Required user id')
    }

    await this.prisma.project.upsert({
      where: { id: project.id || -1 },
      create: {
        ...project,
        created_by_id: project.created_by_id,
      },
      update: project,
    })
  }
}
