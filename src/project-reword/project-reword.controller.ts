import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { Request } from 'express'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ProjectRewordService } from './project-reword.service'
import { ProjectRewordResponseDto, CreateProjectRewordRequestDto, UpdateProjectRewordRequestDto } from './dto'
import { ApiPaginatedResponse, PageRequestDto } from '../common/pagination'
import { ProjectService } from '../project/project.service'

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
  async updateReword(
    @Param('rewordId', ParseIntPipe) rewordId: number,
    @Body() dto: UpdateProjectRewordRequestDto,
    @Req() req: Request,
  ) {
    const reword = await this.rewordService.getRewordById(rewordId)

    if (!reword) {
      throw new NotFoundException('Not found project reword')
    }

    await this.projectService.checkIsCreator({ projectId: reword.project_id, userId: req.user.userId })
    await this.projectService.checkIsUpdatable({ projectId: reword.project_id })

    return await this.rewordService.updateReword(rewordId, dto)
  }

  /**
   * 프로젝트 선물 삭제
   */
  @Delete('/project/reword/:rewordId')
  @UseGuards(JwtAuthGuard)
  async deleteReword() {}
}
