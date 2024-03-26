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

  async getSchedule(scheduleId: number): Promise<ScheduleResponseDto> {
    if (!scheduleId) {
      throw new ConflictException('Required project schedule id')
    }

    const schedule = await this.scheduleRepository.getSchedule(scheduleId)

    if (!schedule) {
      throw new NotFoundException('Not found project schedule')
    }

    return schedule
  }
}
