import { ConflictException, Injectable } from '@nestjs/common'
import { ProjectStatus } from '@prisma/client'
import { CreateProjectRequestDto, CreateProjectResponseDto, ProjectSummaryDto } from './dto'
import { ProjectRepository } from './project.repository'
import { ProjectBulider } from './project.builder'
import { Project } from './domain/project'
import { PageRequestDto, PageResponseDto } from 'src/common/pagination'

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createProject(
    { title, summary, description, thumbnail_url, target_amount, category_id }: CreateProjectRequestDto,
    created_by_id: Project['created_by_id'],
  ): Promise<CreateProjectResponseDto> {
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

    return await this.projectRepository.create(project)
  }

  async getProjects(dto: PageRequestDto): Promise<PageResponseDto<ProjectSummaryDto>> {
    const { page, size } = dto

    const [items, total] = await this.projectRepository.getProjectsWithTotal({
      skip: dto.getSkip(),
      take: dto.getTake(),
    })

    return {
      total,
      prev_page: dto.getPrevPage(),
      next_page: dto.getNextPage(total),
      pages: dto.getPages(total),
      page,
      size,
      items,
    }
  }
}
