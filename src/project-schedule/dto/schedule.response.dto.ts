import { ApiProperty } from '@nestjs/swagger'

export class ScheduleResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  funding_start_date: Date

  @ApiProperty()
  funding_due_date: Date

  @ApiProperty()
  payment_due_date: Date

  @ApiProperty()
  payment_settlement_date: Date

  @ApiProperty()
  project_id: number
}
