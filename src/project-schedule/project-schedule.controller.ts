import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ProjectScheduleService } from './project-schedule.service'
import { CreateScheduleRequestDto, ScheduleResponseDto } from './dto'
import { Roles, RolesGuard } from '../users/roles.guard'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

// TODO: 창작자만 write 가능

@ApiTags('project-schedule')
@Controller()
export class ProjectScheduleController {
  constructor(private readonly scheduleService: ProjectScheduleService) {}

  /**
   * 프로젝트 스케줄 생성
   */
  @Post('/project/:projectId/schedule')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['CREATOR'])
  @ApiCreatedResponse({ type: ScheduleResponseDto })
  async createSchedule(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: CreateScheduleRequestDto,
  ): Promise<ScheduleResponseDto> {
    return await this.scheduleService.createSchedule(projectId, dto)
  }

  /**
   * 프로젝트 스케줄 조회
   */
  @Get('/project/:projectId/schedule')
  @ApiOkResponse({ type: ScheduleResponseDto })
  async getScheduleByProjectId(@Param('projectId', ParseIntPipe) projectId: number): Promise<ScheduleResponseDto> {
    return await this.scheduleService.getSchedule({ project_id: projectId })
  }

  /**
   * 프로젝트 스케줄 단일 조회
   */
  @Get('/project/schedule/:scheduleId')
  @ApiOkResponse({ type: ScheduleResponseDto })
  async getScheduleByScheduleId(@Param('scheduleId', ParseIntPipe) scheduleId: number): Promise<ScheduleResponseDto> {
    return await this.scheduleService.getSchedule({ id: scheduleId })
  }

  /**
   * 프로젝트 스케줄 수정
   */
  @Patch('/project/:projectId/schedule/:scheduleId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['CREATOR'])
  async updateSchedule() {}
}
