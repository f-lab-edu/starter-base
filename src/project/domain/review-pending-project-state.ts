import { ProjectStatus } from '@prisma/client'
import { Project } from './project'
import { ProjectState } from './project-state'
import { BadRequestException } from '@nestjs/common'

export class ReviewPendingProjectState extends ProjectState {
  constructor(project: Project) {
    super(project)
  }

  isValidToReviewPending(): boolean {
    throw new Error('Not supported method')
  }

  isValidToReview(): boolean {
    if (this.project.status !== ProjectStatus.REVIEW_PENDING) {
      throw new BadRequestException('Unsupported status for switching to review approved or rejected')
    }

    if (!this.isValid()) {
      throw new BadRequestException('All elements of the project must be valid')
    }

    return true
  }
}
