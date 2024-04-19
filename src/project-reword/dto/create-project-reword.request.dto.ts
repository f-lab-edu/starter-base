import { IsISO8601, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateProjectRewordRequestDto {
  @ApiProperty()
  @MaxLength(50)
  @MinLength(1)
  @IsString()
  title: string

  @ApiProperty()
  @MaxLength(100)
  @MinLength(1)
  @IsString()
  description: string

  @ApiProperty()
  @Max(1_000_000)
  @Min(1_000)
  @IsNumber()
  amount: number

  @ApiProperty({ required: false })
  @IsOptional()
  @Max(100_000)
  @Min(1)
  @IsNumber()
  limit: number

  @ApiProperty({ example: '2022-01-20T00:00:00.000Z' })
  @IsISO8601()
  expected_delivery_date: string
}
