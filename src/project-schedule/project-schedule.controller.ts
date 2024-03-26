import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ProjectScheduleService } from './project-schedule.service'
import { CreateScheduleRequestDto, ScheduleResponseDto } from './dto'

// TODO: 창작자만 write 가능

@ApiTags('project-schedule')
@Controller()
@UseGuards(JwtAuthGuard)
export class ProjectScheduleController {
  constructor(private readonly scheduleService: ProjectScheduleService) {}

  @Post('/project/:projectId/schedule')
  @ApiCreatedResponse({ type: ScheduleResponseDto })
  async createSchedule(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: CreateScheduleRequestDto,
  ): Promise<ScheduleResponseDto> {
    return await this.scheduleService.createSchedule(projectId, dto)
  }

  @Get('/project/schedule/:scheduleId')
  @ApiOkResponse({ type: ScheduleResponseDto })
  async getSchedule(@Param('scheduleId', ParseIntPipe) scheduleId: number): Promise<ScheduleResponseDto> {
    return await this.scheduleService.getSchedule(scheduleId)
  }

  @Patch('/project/schedule/:scheduleId')
  async updateSchedule() {}

  @Delete('/project/schedule/:scheduleId')
  async deleteSchedule() {}
}
