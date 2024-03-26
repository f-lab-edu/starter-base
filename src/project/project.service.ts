import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { ProjectStatus } from '@prisma/client'
import {
  CreateProjectRequestDto,
  ProjectResponseDto,
  ProjectSummaryDto,
  UpdateProjectRequestDto,
  UpdateProjectStatusRequestDto,
} from './dto'
import { ProjectRepository } from './project.repository'
import { ProjectBulider } from './project.builder'
import { Project } from './domain/project'
import { PageRequestDto, PageResponseDto } from 'src/common/pagination'
import { ProjectScheduleService } from 'src/project-schedule/project-schedule.service'
import { ProjectSchedule } from 'src/project-schedule/domain/project-schedule'

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly scheduleService: ProjectScheduleService,
  ) {}

  async createProject(
    { title, summary, description, thumbnail_url, target_amount, category_id }: CreateProjectRequestDto,
    created_by_id: Project['created_by_id'],
  ): Promise<ProjectResponseDto> {
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

    const [items, total] = await this.projectRepository.getManyWithTotal({
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

  async getProject(id: number): Promise<ProjectResponseDto> {
    if (!id) {
      throw new ConflictException('Required project id')
    }

    const project = await this.projectRepository.getOne(id)

    if (!project) {
      throw new NotFoundException('Not found project')
    }

    return project
  }

  /**
   * 프로젝트 상태 변경
   */
  async updateProjectStatus({ projectId, status }: { projectId: number } & UpdateProjectStatusRequestDto) {
    const _project = await this.getProject(projectId)
    const _schedule = await this.scheduleService.getSchedule({ project_id: projectId })
    const schedule = new ProjectSchedule(
      _schedule.id,
      _schedule.funding_start_date,
      _schedule.funding_due_date,
      _schedule.payment_due_date,
      _schedule.payment_settlement_date,
      _schedule.project_id,
    )
    const project = new ProjectBulider(_project.status, _project.id)
      .setContents(_project.title, _project.summary, _project.description, _project.thumbnail_url)
      .setAmount(_project.target_amount)
      .setCreatedById(_project.created_by_id)
      .setCategoryId(_project.category_id)
      .setSchedule(schedule)
      .build()

    if (status === ProjectStatus.REVIEW_PENDING) {
      if (!project.state.isValidToReviewPending()) {
        throw new Error('Project is not valid to review pending status')
      }
      return await this.projectRepository.updateStatus(projectId, status)
    }

    // TODO: 구현
    throw new Error('Method not implemented')
  }

  async updateProject(projectId: number, dto: UpdateProjectRequestDto) {
    return await this.projectRepository.update(projectId, dto)
  }
}
