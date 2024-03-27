import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateCategoryRequestDto, CategoryResponseDto } from './dto'
import { ProjectCategoryRepository } from './project-category.repository'

@Injectable()
export class ProjectCategoryService {
  constructor(private readonly projectCategoryRepository: ProjectCategoryRepository) {}

  async createCategory({ name }: CreateCategoryRequestDto): Promise<CategoryResponseDto> {
    return await this.projectCategoryRepository.create(name)
  }

  async getCategory(id: number): Promise<CategoryResponseDto> {
    if (!id) {
      throw new ConflictException('Required project category id')
    }

    const category = await this.projectCategoryRepository.getOne(id)

    if (!category) {
      throw new NotFoundException('Not found project category')
    }

    return category
  }
}
