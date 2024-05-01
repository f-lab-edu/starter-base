import { ApiProperty } from '@nestjs/swagger'

export class ProjectRewordResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty()
  amount: number

  @ApiProperty({ nullable: true })
  limit: number | null

  @ApiProperty({ example: '2022-01-20T00:00:00.000Z' })
  expected_delivery_date: Date

  @ApiProperty()
  project_id: number
}
