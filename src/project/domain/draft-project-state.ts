import { Project } from './project'
import { ProjectState } from './project-state'

export class DraftProjectState extends ProjectState {
  constructor(project: Project) {
    super(project)
  }

  // TODO: 추상 메서드 구현
}
