import { ProjectStatus } from '@prisma/client'
import { Project } from './project'
import { DraftProjectState } from './draft-project-state'
import { ProjectState } from './project-state'

export class ProjectStateFactory {
  static create(project: Project): ProjectState {
    switch (project.status) {
      case ProjectStatus.DRAFT:
        return new DraftProjectState(project)
      // TODO: 추가 state 구현
      default:
        throw new Error("Unsupported status to create 'ProjectState'")
    }
  }
}
