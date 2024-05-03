import { ProjectStatus } from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger'

class CategoryInReadSponsorship {
  @ApiProperty()
  name: string
}

class CreatedByUserInReadSponsorship {
  @ApiProperty()
  nickname: string
}

class ProjectScheduleInReadSponsorship {
  @ApiProperty()
  funding_due_date: Date
}

class ProjectRewordInReadSponsorship {
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

class SponsorshipRewordInReadSponsorship {
  @ApiProperty()
  id: number

  @ApiProperty()
  count: number

  @ApiProperty({ type: ProjectRewordInReadSponsorship })
  reword: ProjectRewordInReadSponsorship
}

class ProjectInReadSponsorship {
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

  @ApiProperty({ type: CategoryInReadSponsorship })
  category: CategoryInReadSponsorship

  @ApiProperty({ type: CreatedByUserInReadSponsorship })
  created_by: CreatedByUserInReadSponsorship

  @ApiProperty({ isArray: true, type: ProjectScheduleInReadSponsorship })
  project_schedule: ProjectScheduleInReadSponsorship[]
}

export class SponsorshipResponseDto {
  @ApiProperty()
  created_at: Date

  @ApiProperty({ isArray: true, type: SponsorshipRewordInReadSponsorship })
  sponsorship_reword: SponsorshipRewordInReadSponsorship[]

  @ApiProperty({ type: ProjectInReadSponsorship })
  project: ProjectInReadSponsorship
}
