import { ApiProperty } from '@nestjs/swagger'
import { ProjectStatus } from '@prisma/client'

export class UpdateProjectStatusRequestDto {
  @ApiProperty({ enum: ProjectStatus })
  status: ProjectStatus
}
