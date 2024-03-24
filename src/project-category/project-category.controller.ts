import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { ProjectCategoryService } from './project-category.service'
import { CreateCategoryRequestDto, CreateCategoryResponseDto } from './dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@ApiTags('project-category')
@Controller('project-category')
export class ProjectCategoryController {
  constructor(private readonly projectCategoryService: ProjectCategoryService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateCategoryResponseDto })
  // FIXME: 어드민 권한의 사용자만 허용
  @UseGuards(JwtAuthGuard)
  async createCategory(@Body() dto: CreateCategoryRequestDto): Promise<CreateCategoryResponseDto> {
    return await this.projectCategoryService.createCategory(dto)
  }
}
