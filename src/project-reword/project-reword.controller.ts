import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ProjectRewordService } from './project-reword.service'
import { ProjectRewordResponseDto, CreateProjectRewordRequestDto, UpdateProjectRewordRequestDto } from './dto'
import { ProjectService } from '../project/project.service'
import { Roles, RolesGuard } from '../users/roles.guard'

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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['CREATOR'])
  async createReword(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: CreateProjectRewordRequestDto,
  ): Promise<ProjectRewordResponseDto> {
    return this.rewordService.createReword(projectId, dto)
  }

  /**
   * 프로젝트 선물 리스트 조회
   */
  @Get('/project/:projectId/reword')
  @ApiOkResponse({ type: ProjectRewordResponseDto, isArray: true })
  async getRewords(@Param('projectId', ParseIntPipe) projectId: number): Promise<ProjectRewordResponseDto[]> {
    return await this.rewordService.getRewords(projectId)
  }

  /**
   * 프로젝트 선물 수정
   */
  @Patch('/project/:projectId/reword/:rewordId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['CREATOR'])
  @ApiOkResponse({ type: ProjectRewordResponseDto })
  async updateReword(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('rewordId', ParseIntPipe) rewordId: number,
    @Body() dto: UpdateProjectRewordRequestDto,
  ): Promise<ProjectRewordResponseDto> {
    const reword = await this.rewordService.getRewordById(rewordId)

    if (!reword) {
      throw new NotFoundException('Not found project reword')
    }

    if (reword.project_id !== projectId) {
      throw new BadRequestException('The project id in reword and the project id parameter do not match.')
    }

    await this.projectService.checkIsUpdatable({ projectId: reword.project_id })

    return await this.rewordService.updateReword(rewordId, dto)
  }

  /**
   * 프로젝트 선물 삭제
   */
  @Delete('/project/:projectId/reword/:rewordId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['CREATOR'])
  @ApiOkResponse()
  async deleteReword(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Param('rewordId', ParseIntPipe) rewordId: number,
  ): Promise<void> {
    const reword = await this.rewordService.getRewordById(rewordId)

    if (!reword) {
      throw new NotFoundException('Not found project reword')
    }

    if (reword.project_id !== projectId) {
      throw new BadRequestException('The project id in reword and the project id parameter do not match.')
    }

    await this.projectService.checkIsUpdatable({ projectId: reword.project_id })

    await this.rewordService.deleteReword(rewordId)
  }
}
