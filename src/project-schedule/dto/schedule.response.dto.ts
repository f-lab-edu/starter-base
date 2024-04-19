import { ApiProperty } from '@nestjs/swagger'

export class ScheduleResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty({ example: '2022-01-20T00:00:00.000Z' })
  funding_start_date: Date

  @ApiProperty({ example: '2022-01-20T00:00:00.000Z' })
  funding_due_date: Date

  @ApiProperty({ example: '2022-01-20T00:00:00.000Z' })
  payment_due_date: Date

  @ApiProperty({ example: '2022-01-20T00:00:00.000Z' })
  payment_settlement_date: Date

  @ApiProperty()
  project_id: number
}
