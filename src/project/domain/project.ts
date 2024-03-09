import { ProjectStatus } from '@prisma/client'
import { ProjectState } from './project-state'
import { ProjectStateFactory } from './project-state.factory'

/**
 * Project 도메인
 */
export class Project {
  id?: number
  status: ProjectStatus = ProjectStatus.DRAFT
  title: string
  summary: string
  description: string
  thumbnail_url: string
  target_amount: bigint
  collected_amount: bigint = BigInt(0)
  created_by_id: number
  category_id?: number
  state: ProjectState

  constructor(project: {
    id?: number
    status: ProjectStatus
    title: string
    summary: string
    description: string
    thumbnail_url: string
    target_amount: bigint
    collected_amount: bigint
    created_by_id: number
    category_id?: number
  }) {
    Object.keys(project).forEach((key) => (this[key] = project[key]))
    this.state = ProjectStateFactory.create(this)
  }

  protected changeState(state: ProjectState) {
    this.state = state
  }

  // TODO: ProjectState에서 정의한 메서드 위임

  // TODO: 기타 도메인 메서드
}
