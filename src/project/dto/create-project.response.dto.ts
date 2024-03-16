import { ApiProperty } from '@nestjs/swagger'
import { ProjectStatus } from '@prisma/client'

export class CreateProjectResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty({ enum: ProjectStatus })
  status: ProjectStatus

  @ApiProperty()
  title: string

  @ApiProperty()
  summary: string

  @ApiProperty()
  description: string

  @ApiProperty()
  thumbnail_url: string

  @ApiProperty()
  target_amount: bigint

  @ApiProperty()
  collected_amount: bigint

  @ApiProperty()
  created_by_id: number

  @ApiProperty({ nullable: true })
  category_id: number | null
}
