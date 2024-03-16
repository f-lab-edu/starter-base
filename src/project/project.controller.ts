import { Body, Controller, Post, UseGuards, Req, Get, Query } from '@nestjs/common'
import { Request } from 'express'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { CreateProjectRequestDto, CreateProjectResponseDto, ProjectSummaryDto } from './dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ProjectService } from './project.service'
import { ApiPaginatedResponse, PageRequestDto, PageResponseDto } from 'src/common/pagination'

@ApiTags('project')
@Controller('project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateProjectResponseDto })
  async createProject(@Body() dto: CreateProjectRequestDto, @Req() req: Request): Promise<CreateProjectResponseDto> {
    return await this.projectService.createProject(dto, req.user.userId)
  }

  @Get()
  @ApiPaginatedResponse(ProjectSummaryDto)
  async getProjects(@Query() dto: PageRequestDto): Promise<PageResponseDto<ProjectSummaryDto>> {
    return await this.projectService.getProjects(dto)
  }
}
