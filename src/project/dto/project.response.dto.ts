import { ApiProperty } from '@nestjs/swagger'
import { ProjectStatus } from '@prisma/client'

class ProjectCategory {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string
}

class User {
  @ApiProperty()
  id: number

  @ApiProperty()
  nickname: string
}

export class ProjectResponseDto {
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
  created_by: User

  @ApiProperty({ nullable: true })
  category: ProjectCategory | null
}
