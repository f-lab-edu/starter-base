import { Injectable } from '@nestjs/common'
import { ProjectRepository } from './project.repository'
import { CreateProjectRequestDto } from './dto'
import { Project } from './domain'
import { ProjectBulider } from './project.builder'
import { ProjectStatus } from '@prisma/client'

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createProject(
    { title, summary, description, thumbnail_url, target_amount, category_id }: CreateProjectRequestDto,
    created_by_id: Project['created_by_id'],
  ) {
    const project = new ProjectBulider(ProjectStatus.DRAFT)
      .setContents(title, summary, description, thumbnail_url)
      .setAmount(target_amount)
      .setCreatedById(created_by_id)
      .setCategoryId(category_id)
      .build()

    await this.projectRepository.save(project)
  }
}
