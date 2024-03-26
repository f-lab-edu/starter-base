import { BadRequestException } from '@nestjs/common'
import dayjs from 'dayjs'

const setTimeToEndOfDay = (date: Date) => {
  return dayjs(date).set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 999).toDate()
}

const ScheduleDateKeys = [
  'funding_start_date',
  'funding_due_date',
  'payment_due_date',
  'payment_settlement_date',
] as const

export class ProjectSchedule {
  constructor(
    readonly id: number | null,
    readonly funding_start_date: Date,
    readonly funding_due_date: Date,
    readonly payment_due_date: Date,
    readonly payment_settlement_date: Date,
    readonly project_id: number | null,
  ) {
    this.funding_start_date = dayjs(funding_start_date).set('minute', 0).set('second', 0).set('millisecond', 0).toDate()
    this.funding_due_date = setTimeToEndOfDay(funding_due_date)
    this.payment_due_date = setTimeToEndOfDay(payment_due_date)
    this.payment_settlement_date = setTimeToEndOfDay(payment_settlement_date)
  }

  /** 모든 날짜가 오늘 이후인지 */
  private isAllDateAfterToday() {
    return ScheduleDateKeys.every((key) => dayjs(this[key]).isAfter(dayjs().startOf('day')))
  }

  /** 각 Enum 순서대로 날짜가 나열되어있는지 */
  private isAllDateOrderValid() {
    return ScheduleDateKeys.every((key, index, arr) => {
      if (index + 1 === arr.length) return true
      return dayjs(this[arr[index + 1]]).isAfter(this[key])
    })
  }

  /** 모든 일정들이 유효한 일정인지 */
  public isAllValid(): boolean {
    if (!this.isAllDateAfterToday()) {
      throw new BadRequestException('All schedules must be set for today or later')
    }
    if (!this.isAllDateOrderValid()) {
      throw new BadRequestException('All schedules must be listed in order')
    }

    return true
  }

  // TODO: 결제 마감일, 정산일은 관리자나 시스템만 수정 가능
}
