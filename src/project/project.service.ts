import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ProjectStatus } from '@prisma/client'
import { WriteProjectRequestDto, ProjectResponseDto, ProjectSummaryDto, UpdateProjectStatusRequestDto } from './dto'
import { ProjectRepository } from './project.repository'
import { ProjectBuilder } from './project.builder'
import { Project } from './domain/project'
import { PageRequestDto, PageResponseDto } from 'src/common/pagination'
import { ProjectScheduleService } from 'src/project-schedule/project-schedule.service'
import { ReviewProjectRequestDto } from './dto/review-project.request.dto'

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly scheduleService: ProjectScheduleService,
  ) {}

  async checkIsCreator({ projectId, userId }: { projectId: number; userId: number }): Promise<void> {
    const project = await this.projectRepository.getCreatorId(projectId)

    if (!project) {
      throw new NotFoundException('Not found project')
    }

    if (project.created_by_id !== userId) {
      throw new ForbiddenException('Only creator can be access')
    }
  }

  async createProjectDomain({ projectId }: { projectId: number }): Promise<Project> {
    const { id, status, title, summary, description, thumbnail_url, target_amount, created_by, category } =
      await this.getProject(projectId)
    const schedule = await this.scheduleService.createScheduleDomain({ projectId })

    return new ProjectBuilder(status, id)
      .setContents(title, summary, description, thumbnail_url)
      .setAmount(target_amount)
      .setCreatedById(created_by.id)
      .setCategoryId(category?.id)
      .setSchedule(schedule)
      .build()
  }

  /**
   * 프로젝트 생성
   */
  async createProject(
    { title, summary, description, thumbnail_url, target_amount, category_id }: WriteProjectRequestDto,
    created_by_id: Project['created_by_id'],
  ): Promise<ProjectResponseDto> {
    const count = await this.projectRepository.getDraftProjectCount(created_by_id)

    if (count >= 5) {
      throw new ConflictException('A maximum of 5 draft projects can be created')
    }

    const project = new ProjectBuilder(ProjectStatus.DRAFT)
      .setContents(title, summary, description, thumbnail_url)
      .setAmount(target_amount)
      .setCreatedById(created_by_id)
      .setCategoryId(category_id)
      .build()

    return await this.projectRepository.create(project)
  }

  /**
   * 프로젝트 목록 조회
   */
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

  /**
   * 프로젝트 단일 조회
   */
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
    const project = await this.createProjectDomain({ projectId })

    switch (status) {
      case ProjectStatus.REVIEW_PENDING: {
        if (!project.state.isValidToReviewPending()) {
          throw new BadRequestException('Project is not valid to review pending status')
        }
        break
      }

      case ProjectStatus.REVIEW_APPROVED:
      case ProjectStatus.REVIEW_REJECTED: {
        if (!project.state.isValidToReview()) {
          throw new BadRequestException('Project is not valid to review approved or rejected status')
        }
        break
      }

      // TODO: 구현
      default:
        throw new Error('Method not implemented')
    }

    return await this.projectRepository.updateStatus(projectId, status)
  }

  /**
   * 프로젝트 수정
   */
  async updateProject(projectId: number, dto: WriteProjectRequestDto) {
    const project = await this.getProject(projectId)

    if (project.status !== ProjectStatus.DRAFT && project.status !== ProjectStatus.REVIEW_REJECTED) {
      throw new BadRequestException('Only draft or review rejected projects can be updated')
    }

    return await this.projectRepository.update(projectId, dto)
  }

  /**
   * 프로젝트 심사 승인 또는 거절
   */
  async reviewProject(projectId: number, { result }: ReviewProjectRequestDto) {
    const project = await this.getProject(projectId)

    if (project.status !== ProjectStatus.REVIEW_PENDING) {
      throw new BadRequestException('Only projects in review pending status can be reviewed')
    }

    return await this.updateProjectStatus({ projectId, status: result })
  }
}
