import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ProjectRewordService } from './project-reword.service'
import { ProjectRewordResponseDto, CreateProjectRewordRequestDto } from './dto'
import { ProjectService } from '../project/project.service'
import { ApiPaginatedResponse, PageRequestDto } from '../common/pagination'

// TODO: 창작자만 write 가능

@ApiTags('project-reword')
@Controller()
export class ProjectRewordController {
  constructor(private readonly rewordService: ProjectRewordService, private readonly projectService: ProjectService) {}

  /**
   * 프로젝트 선물 생성
   */
  @Post('/project/:projectId/reword')
  @ApiCreatedResponse({ type: ProjectRewordResponseDto })
  @UseGuards(JwtAuthGuard)
  async createReword(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: CreateProjectRewordRequestDto,
    @Req() req: Request,
  ): Promise<ProjectRewordResponseDto> {
    await this.projectService.checkIsCreator({ projectId, userId: req.user.userId })

    return this.rewordService.createReword(projectId, dto)
  }

  /**
   * 프로젝트 선물 리스트 조회
   */
  @Get('/project/:projectId/reword')
  @ApiPaginatedResponse(ProjectRewordResponseDto)
  async getRewords(@Param('projectId', ParseIntPipe) projectId: number, @Query() dto: PageRequestDto) {
    return await this.rewordService.getRewords(projectId, dto)
  }

  /**
   * 프로젝트 선물 수정
   */
  @Patch('/project/reword/:rewordId')
  @UseGuards(JwtAuthGuard)
  async updateReword() {}

  /**
   * 프로젝트 선물 삭제
   */
  @Delete('/project/reword/:rewordId')
  @UseGuards(JwtAuthGuard)
  async deleteReword() {}
}
