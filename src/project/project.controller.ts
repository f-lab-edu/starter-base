import { Body, Controller, Post, UseGuards, Req, Get, Query, Patch, Param, ParseIntPipe } from '@nestjs/common'
import { Request } from 'express'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { WriteProjectRequestDto, ProjectResponseDto, ProjectSummaryDto, UpdateProjectStatusRequestDto } from './dto'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ProjectService } from './project.service'
import { ApiPaginatedResponse, PageRequestDto, PageResponseDto } from 'src/common/pagination'
import { ProjectCategoryService } from 'src/project-category/project-category.service'
import { RolesGuard } from '../users/roles.guard'
import { ReviewProjectRequestDto } from './dto/review-project.request.dto'

// TODO: 창작자만 write 가능

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly categoryService: ProjectCategoryService,
  ) {}

  /**
   * 프로젝트 생성
   */
  @Post()
  @ApiCreatedResponse({ type: ProjectResponseDto })
  @UseGuards(JwtAuthGuard)
  async createProject(@Body() dto: WriteProjectRequestDto, @Req() req: Request): Promise<ProjectResponseDto> {
    return await this.projectService.createProject(dto, req.user.userId)
  }

  /**
   * 프로젝트 리스트 조회
   */
  @Get()
  @ApiPaginatedResponse(ProjectSummaryDto)
  async getProjects(@Query() dto: PageRequestDto): Promise<PageResponseDto<ProjectSummaryDto>> {
    return await this.projectService.getProjects(dto)
  }

  /**
   * 프로젝트 단일 조회
   */
  @Get(':projectId')
  @ApiOkResponse({ type: ProjectResponseDto })
  async getProject(@Param('projectId', ParseIntPipe) projectId: number): Promise<ProjectResponseDto> {
    return await this.projectService.getProject(projectId)
  }

  /**
   * 프로젝트 수정
   */
  @Patch(':projectId')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ProjectResponseDto })
  async updateProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: WriteProjectRequestDto,
    @Req() req: Request,
  ): Promise<ProjectResponseDto> {
    await this.projectService.checkIsCreator({ projectId, userId: req.user.userId })
    await this.projectService.checkIsUpdatable({ projectId })

    if (typeof dto.category_id === 'number') {
      const category = await this.categoryService.getCategory(dto.category_id)
      return await this.projectService.updateProject(projectId, { ...dto, category_id: category.id })
    }

    return await this.projectService.updateProject(projectId, dto)
  }

  /**
   * 프로젝트 상태 변경
   */
  @Patch(':projectId/status')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ProjectResponseDto })
  async updateProjectStatus(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Query() { status }: UpdateProjectStatusRequestDto,
    @Req() req: Request,
  ): Promise<ProjectResponseDto> {
    await this.projectService.checkIsCreator({ projectId, userId: req.user.userId })

    return await this.projectService.updateProjectStatus({ projectId, status })
  }

  /**
   * 프로젝트 심사(승인 또는 거절)
   */
  @Patch(':projectId/review')
  @UseGuards(JwtAuthGuard, RolesGuard('ADMIN'))
  @ApiOkResponse({ type: ProjectResponseDto })
  async reviewProject(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Query() { result }: ReviewProjectRequestDto,
  ): Promise<ProjectResponseDto> {
    return await this.projectService.reviewProject(projectId, { result })
  }
}
