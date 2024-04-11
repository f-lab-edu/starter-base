import { Body, Controller, Post, UseGuards, Req, Get, Query, Patch, Param, ParseIntPipe } from '@nestjs/common'
import { Request } from 'express'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import {
  CreateProjectRequestDto,
  ProjectResponseDto,
  ProjectSummaryDto,
  UpdateProjectRequestDto,
  UpdateProjectStatusRequestDto,
} from './dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ProjectService } from './project.service'
import { ApiPaginatedResponse, PageRequestDto, PageResponseDto } from 'src/common/pagination'
import { ProjectCategoryService } from 'src/project-category/project-category.service'

// TODO: 창작자만 write 가능

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly categoryService: ProjectCategoryService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: ProjectResponseDto })
  @UseGuards(JwtAuthGuard)
  async createProject(@Body() dto: CreateProjectRequestDto, @Req() req: Request): Promise<ProjectResponseDto> {
    return await this.projectService.createProject(dto, req.user.userId)
  }

  @Get()
  @ApiPaginatedResponse(ProjectSummaryDto)
  async getProjects(@Query() dto: PageRequestDto): Promise<PageResponseDto<ProjectSummaryDto>> {
    return await this.projectService.getProjects(dto)
  }

  @Get(':projectId')
  async getProject(@Param('projectId', ParseIntPipe) projectId: number): Promise<ProjectResponseDto> {
    return await this.projectService.getProject(projectId)
  }

  @Patch(':projectId')
  @UseGuards(JwtAuthGuard)
  async updateProject(@Param('projectId', ParseIntPipe) projectId: number, @Body() dto: UpdateProjectRequestDto) {
    if (typeof dto.category_id === 'number') {
      const category = await this.categoryService.getCategory(dto.category_id)
      return await this.projectService.updateProject(projectId, { ...dto, category_id: category.id })
    }

    return await this.projectService.updateProject(projectId, dto)
  }

  @Patch(':projectId/status')
  @ApiOkResponse({ type: ProjectResponseDto })
  @UseGuards(JwtAuthGuard)
  async updateProjectStatus(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Query() { status }: UpdateProjectStatusRequestDto,
  ): Promise<ProjectResponseDto> {
    return await this.projectService.updateProjectStatus({ projectId, status })
  }
}
