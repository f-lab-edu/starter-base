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

export class ProjectSummaryDto {
  @ApiProperty()
  id: number

  @ApiProperty({ enum: ProjectStatus })
  status: ProjectStatus

  @ApiProperty()
  title: string

  @ApiProperty()
  summary: string

  @ApiProperty()
  thumbnail_url: string

  @ApiProperty()
  target_amount: bigint

  @ApiProperty()
  collected_amount: bigint

  // TODO: 목표달성률 퍼센트

  @ApiProperty({ nullable: true })
  category: ProjectCategory | null

  @ApiProperty()
  created_by: User

  // TODO: 펀딩마감일
}
