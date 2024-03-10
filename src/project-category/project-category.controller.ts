import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ProjectCategoryService } from './project-category.service'
import { CreateCategoryRequestDto, CreateCategoryResponseDto } from './dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('project-category')
export class ProjectCategoryController {
  constructor(private readonly projectCategoryService: ProjectCategoryService) {}

  @Post()
  // FIXME: 어드민 권한의 사용자만 허용
  @UseGuards(JwtAuthGuard)
  async createCategory(@Body() dto: CreateCategoryRequestDto): Promise<CreateCategoryResponseDto> {
    return await this.projectCategoryService.createCategory(dto)
  }
}
