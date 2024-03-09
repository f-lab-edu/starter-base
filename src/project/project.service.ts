import { ConflictException, Injectable } from '@nestjs/common'
import { ProjectStatus } from '@prisma/client'
import { CreateProjectRequestDto } from './dto'
import { ProjectRepository } from './project.repository'
import { ProjectBulider } from './project.builder'
import { Project } from './domain/project'

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createProject(
    { title, summary, description, thumbnail_url, target_amount, category_id }: CreateProjectRequestDto,
    created_by_id: Project['created_by_id'],
  ) {
    const count = await this.projectRepository.getDraftProjectCount(created_by_id)

    if (count >= 5) {
      throw new ConflictException('A maximum of 5 draft projects can be created')
    }

    const project = new ProjectBulider(ProjectStatus.DRAFT)
      .setContents(title, summary, description, thumbnail_url)
      .setAmount(target_amount)
      .setCreatedById(created_by_id)
      .setCategoryId(category_id)
      .build()

    await this.projectRepository.save(project)
  }
}
