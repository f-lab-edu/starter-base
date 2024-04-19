import { ProjectStatus } from '@prisma/client'
import { Project } from './project'
import { ProjectState } from './project-state'
import { BadRequestException } from '@nestjs/common'

export class DraftProjectState extends ProjectState {
  constructor(project: Project) {
    super(project)
  }

  isValidToReviewPending(): boolean {
    if (this.project.status !== ProjectStatus.DRAFT && this.project.status !== ProjectStatus.REVIEW_REJECTED) {
      throw new BadRequestException('Unsupported status for switching to review pending')
    }

    if (!this.isValid()) {
      throw new BadRequestException('All elements of the project must be valid')
    }

    return true
  }

  isValidToReviewApproved(): boolean {
    throw new Error('Not supported method')
  }

  isValidToReviewRejected(): boolean {
    throw new Error('Not supported method')
  }
}
