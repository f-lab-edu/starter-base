import { Injectable } from '@nestjs/common'
import { CreateCategoryRequestDto, CreateCategoryResponseDto } from './dto'
import { ProjectCategoryRepository } from './project-category.repository'

@Injectable()
export class ProjectCategoryService {
  constructor(private readonly projectCategoryRepository: ProjectCategoryRepository) {}

  async createCategory({ name }: CreateCategoryRequestDto): Promise<CreateCategoryResponseDto> {
    return await this.projectCategoryRepository.create(name)
  }
}
