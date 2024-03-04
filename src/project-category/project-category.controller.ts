import { Body, Controller, Post } from '@nestjs/common'
import { ProjectCategoryService } from './project-category.service'
import { CreateCategoryRequestDto } from './dto'

@Controller('project-category')
export class ProjectCategoryController {
  constructor(private readonly projectCategoryService: ProjectCategoryService) {}

  @Post()
  async createCategory(@Body() dto: CreateCategoryRequestDto): Promise<void> {
    await this.projectCategoryService.createCategory(dto)
  }
}
