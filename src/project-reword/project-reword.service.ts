import { Injectable } from '@nestjs/common'
import { CreateProjectRewordRequestDto, ProjectRewordResponseDto } from './dto'
import { ProjectRewordRepository } from './project-reword.repository'

@Injectable()
export class ProjectRewordService {
  constructor(private readonly rewordRepository: ProjectRewordRepository) {}

  async createReword(projectId: number, dto: CreateProjectRewordRequestDto): Promise<ProjectRewordResponseDto> {
    // TODO: expected_delivery_date 가 ProjectSchedule 일정들보다 이후의 날짜여야 함
    return await this.rewordRepository.create(projectId, dto)
  }
}
