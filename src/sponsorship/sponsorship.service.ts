import { BadRequestException, Injectable } from '@nestjs/common'
import { ProjectRewordService } from '../project-reword/project-reword.service'
import { CreateSponsorshipRequestDto, CreateSponsorshipResponseDto } from './dto'
import { SponsorshipRepository } from './sponsorship.repository'
import { ProjectService } from '../project/project.service'

@Injectable()
export class SponsorshipService {
  constructor(
    private readonly projectRewordService: ProjectRewordService,
    private readonly sponsorshipRepository: SponsorshipRepository,
    private readonly projectService: ProjectService,
  ) {}

  /**
   * 후원 신청
   */
  async createSponsorship(
    projectId: number,
    { rewords: sponsorshipRewords }: CreateSponsorshipRequestDto,
    userId: number,
  ): Promise<CreateSponsorshipResponseDto> {
    const project = await this.projectService.createProjectDomain({ projectId })

    // 프로젝트가 후원 가능한 상태인지 체크
    if (!project.state.isSponsorable()) {
      throw new BadRequestException('This project is not eligible for sponsorship.')
    }

    const projectRewords = await this.projectRewordService.getRewords(
      projectId,
      sponsorshipRewords.map(({ project_reword_id }) => project_reword_id),
    )

    // 모든 프로젝트 선물이 후원하고자 하는 프로젝트에 속하는지 체크
    if (
      projectRewords.length !== sponsorshipRewords.length ||
      projectRewords.some((reword) => reword.project_id !== projectId)
    ) {
      throw new BadRequestException('This reword does not belong to the project')
    }

    // 후원 선물 제한수량에 걸리지 않는지 체크
    const limitChecks = await Promise.all(
      sponsorshipRewords.map(async (sponsorshipReword) => {
        const limit = await this.sponsorshipRepository.getSponsorshipRewordLimit(sponsorshipReword.project_reword_id)
        return sponsorshipReword.count > limit
      }),
    )

    const isExceedsLimit = limitChecks.some((check) => check)
    if (isExceedsLimit) {
      throw new BadRequestException('The reword count exceeds the limit')
    }

    // 후원 데이터 등록
    const { id, created_at } = await this.sponsorshipRepository.create(projectId, sponsorshipRewords, userId)
    const amount = projectRewords.reduce(
      (total, reword) =>
        total + reword.amount * sponsorshipRewords.find((r) => r.project_reword_id === reword.id).count,
      0,
    )
    return {
      sponsorship_id: id,
      project_id: projectId,
      user_id: userId,
      amount: projectRewords.reduce((total, reword) => total + reword.amount, 0),
      created_at,
    }
  }
}
