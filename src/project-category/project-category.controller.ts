import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { ProjectCategoryService } from './project-category.service'
import { CreateCategoryRequestDto, CategoryResponseDto } from './dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Roles, RolesGuard } from '../users/roles.guard'

@ApiTags('project-category')
@Controller('project-category')
export class ProjectCategoryController {
  constructor(private readonly projectCategoryService: ProjectCategoryService) {}

  @Post()
  @ApiCreatedResponse({ type: CategoryResponseDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['ADMIN'])
  async createCategory(@Body() dto: CreateCategoryRequestDto): Promise<CategoryResponseDto> {
    return await this.projectCategoryService.createCategory(dto)
  }
}
