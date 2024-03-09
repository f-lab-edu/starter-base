import { ProjectStatus } from '@prisma/client'
import { DraftProjectState } from './draft-project-state'
import { Project } from '.'

export class ProjectStateFactory {
  static create(project: Project) {
    switch (project.status) {
      case ProjectStatus.DRAFT:
        return new DraftProjectState(project)
      // TODO: 추가 state 구현
      default:
        throw new Error("Unsupported status to create 'ProjectState'")
    }
  }
}
