import { Injectable } from '@nestjs/common'
import { ProjectRepository } from './project.repository'
import { CreateProjectRequestDto } from './dto'
import { Project } from './domain'

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createProject(
    { title, summary, description, thumbnail_url, target_amount, category_id }: CreateProjectRequestDto,
    created_by_id: Project['created_by_id'],
  ) {
    const project = new Project(
      undefined,
      undefined,
      title,
      summary,
      description,
      thumbnail_url,
      target_amount,
      undefined,
      created_by_id,
      category_id,
    )
    console.log({ project })
    await this.projectRepository.save(project)
  }
}
