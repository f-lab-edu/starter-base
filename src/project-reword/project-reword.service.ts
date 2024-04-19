import { Injectable } from '@nestjs/common'
import { CreateProjectRewordRequestDto, ProjectRewordResponseDto } from './dto'
import { ProjectRewordRepository } from './project-reword.repository'
import { PageRequestDto, PageResponseDto } from '../common/pagination'

@Injectable()
export class ProjectRewordService {
  constructor(private readonly rewordRepository: ProjectRewordRepository) {}

  async createReword(projectId: number, dto: CreateProjectRewordRequestDto): Promise<ProjectRewordResponseDto> {
    // TODO: expected_delivery_date 가 ProjectSchedule 일정들보다 이후의 날짜여야 함
    return await this.rewordRepository.create(projectId, dto)
  }

  async getRewords(projectId: number, dto: PageRequestDto): Promise<PageResponseDto<ProjectRewordResponseDto>> {
    const { page, size } = dto

    const [items, total] = await this.rewordRepository.getManyWithTotal({
      skip: dto.getSkip(),
      take: dto.getTake(),
      projectId,
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
