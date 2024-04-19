import { ApiProperty } from '@nestjs/swagger'
import { ProjectStatus } from '@prisma/client'

export class ReviewProjectRequestDto {
  @ApiProperty({ enum: [ProjectStatus.REVIEW_APPROVED, ProjectStatus.REVIEW_REJECTED] })
  result: typeof ProjectStatus.REVIEW_APPROVED | typeof ProjectStatus.REVIEW_REJECTED
}
