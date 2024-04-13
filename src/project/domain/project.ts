import { ProjectStatus } from '@prisma/client'
import { ProjectState } from './project-state'
import { ProjectStateFactory } from './project-state.factory'
import { BadRequestException } from '@nestjs/common'
import { isURL } from 'class-validator'
import { ProjectSchedule } from 'src/project-schedule/domain/project-schedule'

const MIN_TITLE_LENGTH = 1
const MAX_TITLE_LENGTH = 32
const MIN_SUMMARY_LENGTH = 10
const MAX_SUMMARY_LENGTH = 50
const MIN_DESCRIPTION_LENGTH = 1
const MIN_TARGET_AMOUNT = BigInt(500_000)

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
    if (this.title.length < MIN_TITLE_LENGTH || this.title.length > MAX_TITLE_LENGTH) {
      throw new BadRequestException('Title must be between 1 and 32 characters')
    }
    if (this.summary.length < MIN_SUMMARY_LENGTH || this.summary.length > MAX_SUMMARY_LENGTH) {
      throw new BadRequestException('Summary must be between 10 and 50 characters')
    }
    if (this.description.length < MIN_DESCRIPTION_LENGTH) {
      throw new BadRequestException('Description is required')
    }
    if (!isURL(this.thumbnail_url)) {
      throw new BadRequestException('Thumbnail url is required')
    }
    if (this.target_amount < MIN_TARGET_AMOUNT) {
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
