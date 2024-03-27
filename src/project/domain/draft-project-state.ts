import { ProjectStatus } from '@prisma/client'
import { Project } from './project'
import { ProjectState } from './project-state'
import { BadRequestException } from '@nestjs/common'

export class DraftProjectState extends ProjectState {
  constructor(project: Project) {
    super(project)
  }

  isValidToReviewPending(): boolean {
    if (this.project.status !== ProjectStatus.DRAFT && this.project.status !== ProjectStatus.REVIEW_FAILED) {
      throw new Error('Unsupported status for switching to review pending')
    }

    if (!this.project.isAllValid()) {
      throw new BadRequestException('Project must be valid')
    }
    if (!this.project.schedule?.isAllValid()) {
      throw new BadRequestException('Project schedules must be valid')
    }
    // TODO: reword 검사

    return true
  }
}
