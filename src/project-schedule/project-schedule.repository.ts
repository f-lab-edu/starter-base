import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ScheduleResponseDto } from './dto'

@Injectable()
export class ProjectScheduleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    projectId: number,
    {
      funding_start_date,
      funding_due_date,
      payment_due_date,
      payment_settlement_date,
    }: {
      funding_start_date: string
      funding_due_date: string
      payment_due_date: string
      payment_settlement_date: string
    },
  ): Promise<ScheduleResponseDto> {
    return await this.prisma.projectSchedule.create({
      data: {
        funding_start_date,
        funding_due_date,
        payment_due_date,
        payment_settlement_date,
        project_id: projectId,
      },
      select: {
        id: true,
        funding_start_date: true,
        funding_due_date: true,
        payment_due_date: true,
        payment_settlement_date: true,
        project_id: true,
      },
    })
  }

  async getSchedule(scheduleId: number): Promise<ScheduleResponseDto> {
    return await this.prisma.projectSchedule.findUnique({
      where: { id: scheduleId },
      select: {
        id: true,
        funding_start_date: true,
        funding_due_date: true,
        payment_due_date: true,
        payment_settlement_date: true,
        project_id: true,
      },
    })
  }
}
