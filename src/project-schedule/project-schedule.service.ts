import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { ProjectScheduleRepository } from './project-schedule.repository'
import { CreateScheduleRequestDto, ScheduleResponseDto } from './dto'
import * as dayjs from 'dayjs'
import { ProjectSchedule } from './domain/project-schedule'

@Injectable()
export class ProjectScheduleService {
  constructor(private readonly scheduleRepository: ProjectScheduleRepository) {}

  async createScheduleDomain({ projectId }): Promise<ProjectSchedule> {
    const { id, funding_start_date, funding_due_date, payment_due_date, payment_settlement_date, project_id } =
      await this.getSchedule({ project_id: projectId })
    return new ProjectSchedule(
      id,
      funding_start_date,
      funding_due_date,
      payment_due_date,
      payment_settlement_date,
      project_id,
    )
  }

  async createSchedule(projectId: number, dto: CreateScheduleRequestDto): Promise<ScheduleResponseDto> {
    return await this.scheduleRepository.create(projectId, {
      ...dto,
      payment_due_date: dayjs(dto.funding_due_date).add(7, 'day').toISOString(),
      payment_settlement_date: dayjs(dto.funding_due_date).add(14, 'day').toISOString(),
    })
  }

  async getSchedule({ project_id }: { project_id: number }): Promise<ScheduleResponseDto> {
    if (!project_id) {
      throw new ConflictException('Required project schedule id or project id')
    }

    const schedule = await this.scheduleRepository.getSchedule({ project_id })

    if (!schedule) {
      throw new NotFoundException('Not found project schedule')
    }

    return schedule
  }
}
