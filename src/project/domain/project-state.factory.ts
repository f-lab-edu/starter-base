import { ProjectStatus } from '@prisma/client'
import { Project } from './project'
import { DraftProjectState } from './draft-project-state'
import { ProjectState } from './project-state'
import { ReviewPendingProjectState } from './review-pending-project-state'
import { FundingOpenedProjectState } from './funding-opened-project-state'

export class ProjectStateFactory {
  static create(project: Project): ProjectState {
    switch (project.status) {
      case ProjectStatus.DRAFT:
        return new DraftProjectState(project)
      case ProjectStatus.REVIEW_PENDING:
        return new ReviewPendingProjectState(project)
      case ProjectStatus.REVIEW_APPROVED:
        throw new Error("Unsupported status to create 'ProjectState'")
      case ProjectStatus.REVIEW_REJECTED:
        throw new Error("Unsupported status to create 'ProjectState'")
      case ProjectStatus.FUNDING_OPENED:
        return new FundingOpenedProjectState(project)
      // TODO: 추가 state 구현
      default:
        throw new Error("Unsupported status to create 'ProjectState'")
    }
  }
}
