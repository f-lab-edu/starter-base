import { ProjectStatus } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

class Category {
  @ApiProperty()
  name: string
}

class CreatedByUser {
  @ApiProperty()
  nickname: string
}

class ProjectSchedule {
  @ApiProperty()
  funding_due_date: Date
}

class ProjectReword {
  @ApiProperty()
  id: number

  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty()
  amount: number

  @ApiProperty()
  expected_delivery_date: Date
}

class SponsorshipReword {
  @ApiProperty()
  id: number

  @ApiProperty()
  count: number

  @ApiProperty({ type: ProjectReword })
  reword: ProjectReword
}

class Project {
  @ApiProperty()
  id: number

  @ApiProperty({ enum: ProjectStatus })
  status: ProjectStatus

  @ApiProperty()
  title: string

  @ApiProperty()
  target_amount: bigint

  @ApiProperty()
  collected_amount: bigint

  @ApiProperty({ type: Category })
  category: Category

  @ApiProperty({ type: CreatedByUser })
  created_by: CreatedByUser

  @ApiProperty({ isArray: true, type: ProjectSchedule })
  project_schedule: ProjectSchedule[]
}

export class SponsorshipResponseDto {
  @ApiProperty()
  created_at: Date

  @ApiProperty({ isArray: true, type: SponsorshipReword })
  sponsorship_reword: SponsorshipReword[]

  @ApiProperty({ type: Project })
  project: Project
}
