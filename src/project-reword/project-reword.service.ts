import { Injectable } from '@nestjs/common'
import { CreateProjectRewordRequestDto, ProjectRewordResponseDto, UpdateProjectRewordRequestDto } from './dto'
import { ProjectRewordRepository } from './project-reword.repository'

@Injectable()
export class ProjectRewordService {
  constructor(private readonly rewordRepository: ProjectRewordRepository) {}

  async createReword(projectId: number, dto: CreateProjectRewordRequestDto): Promise<ProjectRewordResponseDto> {
    // TODO: expected_delivery_date 가 ProjectSchedule 일정들보다 이후의 날짜여야 함
    return await this.rewordRepository.create(projectId, dto)
  }

  async getRewords(projectId: number): Promise<ProjectRewordResponseDto[]> {
    return await this.rewordRepository.getMany({ projectId })
  }

  async getRewordById(rewordId: number): Promise<ProjectRewordResponseDto> {
    return await this.rewordRepository.getOneById(rewordId)
  }

  async updateReword(rewordId: number, dto: UpdateProjectRewordRequestDto): Promise<ProjectRewordResponseDto> {
    return await this.rewordRepository.update(rewordId, dto)
  }

  async deleteReword(rewordId: number): Promise<void> {
    return await this.rewordRepository.delete(rewordId)
  }
}
