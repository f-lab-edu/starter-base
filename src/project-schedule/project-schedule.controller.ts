import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { ProjectScheduleService } from './project-schedule.service'
import { CreateScheduleRequestDto, ScheduleResponseDto } from './dto'

// TODO: 창작자만 write 가능

@ApiTags('project-schedule')
@Controller()
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

  @Patch('/project/schedule/:scheduleId')
  async updateSchedule() {}
}
