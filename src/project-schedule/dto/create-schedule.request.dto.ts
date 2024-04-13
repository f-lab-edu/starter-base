import { ApiProperty } from '@nestjs/swagger'
import { IsISO8601 } from 'class-validator'

export class CreateScheduleRequestDto {
  @IsISO8601()
  @ApiProperty()
  funding_start_date: string

  @IsISO8601()
  @ApiProperty()
  funding_due_date: string
}
