import { ProjectStatus } from '@prisma/client'
import { ProjectState } from './project-state'
import { ProjectStateFactory } from './project-state.factory'
import { BadRequestException } from '@nestjs/common'
import { isURL } from 'class-validator'
import { ProjectSchedule } from 'src/project-schedule/domain/project-schedule'

/**
 * Project 도메인
 */
export class Project {
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
  schedule?: ProjectSchedule
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
    schedule?: ProjectSchedule
  }) {
    Object.keys(project).forEach((key) => (this[key] = project[key]))
    this.state = ProjectStateFactory.create(this)
  }

  protected changeState(state: ProjectState) {
    this.state = state
  }

  public isAllValid(): boolean {
    if (this.title.length < 1 || this.title.length > 32) {
      throw new BadRequestException('Title must be between 1 and 32 characters')
    }
    if (this.summary.length < 10 || this.summary.length > 50) {
      throw new BadRequestException('Summary must be between 10 and 50 characters')
    }
    if (this.description.length < 1) {
      throw new BadRequestException('Description is required')
    }
    if (!isURL(this.thumbnail_url)) {
      throw new BadRequestException('Thumbnail url is required')
    }
    if (this.target_amount < BigInt(500_000)) {
      throw new BadRequestException('Target amount must be over 500,000')
    }
    if (!this.category_id) {
      throw new BadRequestException('Category is required')
    }

    return true
  }

  // TODO: ProjectState에서 정의한 메서드 위임

  // TODO: 기타 도메인 메서드
}
