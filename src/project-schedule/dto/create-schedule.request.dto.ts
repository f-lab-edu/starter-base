import { ApiProperty } from '@nestjs/swagger'
import { IsISO8601 } from 'class-validator'

export class CreateScheduleRequestDto {
  @IsISO8601()
  @ApiProperty({ example: '2022-01-20T00:00:00.000Z' })
  funding_start_date: string

  @IsISO8601()
  @ApiProperty({ example: '2022-01-20T00:00:00.000Z' })
  funding_due_date: string
}
