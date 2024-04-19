import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ProjectRewordService } from './project-reword.service'
import { ProjectRewordResponseDto, CreateProjectRewordRequestDto } from './dto'

// TODO: 창작자만 write 가능

@ApiTags('project-reword')
@Controller()
export class ProjectRewordController {
  constructor(private readonly rewordService: ProjectRewordService) {}

  /**
   * 프로젝트 선물 생성
   */
  @Post('/project/:projectId/reword')
  @ApiCreatedResponse({ type: ProjectRewordResponseDto })
  @UseGuards(JwtAuthGuard)
  async createReword(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: CreateProjectRewordRequestDto,
  ): Promise<ProjectRewordResponseDto> {
    // TODO: 해당 프로젝트를 생성한 user 인지 체크
    return this.rewordService.createReword(projectId, dto)
  }

  /**
   * 프로젝트 선물 리스트 조회
   */
  @Get('/project/:projectId/reword')
  async getRewords() {}

  /**
   * 프로젝트 선물 단일 조회
   */
  @Get('/project/reword/:rewordId')
  async getReword() {}

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
