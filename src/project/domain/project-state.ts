import { Project } from './project'

export abstract class ProjectState {
  constructor(public project: Project) {}

  abstract isValidToReviewPending(): boolean
}
