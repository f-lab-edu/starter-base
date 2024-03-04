import { Injectable } from '@nestjs/common'
import { CreateCategoryRequestDto } from './dto'
import { ProjectCategoryRepository } from './project-category.repository'

@Injectable()
export class ProjectCategoryService {
  constructor(private readonly projectCategoryRepository: ProjectCategoryRepository) {}

  async createCategory({ name }: CreateCategoryRequestDto) {
    await this.projectCategoryRepository.create(name)
  }
}
