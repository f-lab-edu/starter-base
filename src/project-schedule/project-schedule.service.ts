import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { ProjectScheduleRepository } from './project-schedule.repository'
import { CreateScheduleRequestDto, ScheduleResponseDto } from './dto'
import dayjs from 'dayjs'

@Injectable()
export class ProjectScheduleService {
  constructor(private readonly scheduleRepository: ProjectScheduleRepository) {}

  async createSchedule(projectId: number, dto: CreateScheduleRequestDto): Promise<ScheduleResponseDto> {
    return await this.scheduleRepository.create(projectId, {
      ...dto,
      payment_due_date: dayjs(dto.funding_due_date).add(7, 'day').toISOString(),
      payment_settlement_date: dayjs(dto.funding_due_date).add(14, 'day').toISOString(),
    })
  }

  async getSchedule({ id, project_id }: { id?: number; project_id?: number }): Promise<ScheduleResponseDto> {
    if (!id && !project_id) {
      throw new ConflictException('Required project schedule id or project id')
    }

    const schedule = await this.scheduleRepository.getSchedule({ id, project_id })

    if (!schedule) {
      throw new NotFoundException('Not found project schedule')
    }

    return schedule
  }
}
