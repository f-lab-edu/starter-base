import { Project } from './project'
import { BadRequestException } from '@nestjs/common'

export abstract class ProjectState {
  protected constructor(public project: Project) {}

  /** 프로젝트의 모든 구성요소가 유효한지 검사하는 함수 */
  protected isValid(): boolean {
    if (!this.project.isAllValid()) {
      throw new BadRequestException('Project must be valid')
    }
    if (!this.project.schedule?.isAllValid()) {
      throw new BadRequestException('Project schedules must be valid')
    }
    // TODO: reword 검사

    return true
  }

  /** 프로젝트 심사 대기로 전환 가능한 상태인지 체크 */
  abstract isValidToReviewPending(): boolean

  /** 프로젝트 심사 가능한 상태인지 체크 */
  abstract isValidToReview(): boolean

  /** 후원 가능한 상태인지 체크 */
  abstract isSponsorable(): boolean
}
