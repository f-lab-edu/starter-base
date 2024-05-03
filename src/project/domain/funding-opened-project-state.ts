import { ProjectState } from './project-state'
import { Project } from './project'

export class FundingOpenedProjectState extends ProjectState {
  constructor(project: Project) {
    super(project)
  }

  isValidToReviewPending(): boolean {
    throw new Error('Not supported method')
  }

  isValidToReview(): boolean {
    throw new Error('Not supported method')
  }

  public isSponsorable(): boolean {
    return true
  }
}
