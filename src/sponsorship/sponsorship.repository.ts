import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSponsorshipRequestDto, SponsorshipResponseDto } from './dto'

@Injectable()
export class SponsorshipRepository {
  constructor(private readonly prisma: PrismaService) {}

  /** sponsorship, sponsorship_reword 생성 */
  async create(
    projectId: number,
    sponsorshipRewords: CreateSponsorshipRequestDto['rewords'],
    userId: number,
  ): Promise<{ id: number; created_at: Date }> {
    return this.prisma.$transaction(async (tx) => {
      // sponsorship 등록
      const sponsorship = await tx.sponsorship.create({
        data: { project_id: projectId, created_by_id: userId },
        select: { id: true, created_at: true },
      })
      // sponsorship_reword 등록
      await tx.sponsorshipReword.createMany({
        data: sponsorshipRewords.map(({ project_reword_id, count }) => ({
          count,
          reword_id: project_reword_id,
          sponsorship_id: sponsorship.id,
        })),
      })

      const projectRewords = await tx.projectReword.findMany({
        where: { id: { in: sponsorshipRewords.map(({ project_reword_id }) => project_reword_id) } },
        select: { id: true, amount: true },
      })
      const amount = projectRewords
        .map(({ id, amount }) => amount * sponsorshipRewords.find((r) => r.project_reword_id === id).count)
        .reduce((acc, curr) => acc + curr, 0)

      // 프로젝트 모인 금액(collected_amount) 업데이트
      await tx.project.update({
        where: { id: projectId },
        data: { collected_amount: { increment: amount } },
      })

      return sponsorship
    })
  }

  /** 남은 후원 가능수량 조회 */
  async getSponsorshipRewordLimit(projectRewordId: number): Promise<number> {
    return this.prisma.$transaction(async (tx) => {
      const { limit } = await tx.projectReword.findUnique({
        where: { id: projectRewordId },
        select: { limit: true },
      })

      if (limit === null) return Infinity

      const counts = await tx.sponsorshipReword.findMany({
        where: { reword_id: projectRewordId },
        select: { count: true },
      })
      const count = counts.reduce((acc, curr) => acc + curr.count, 0)

      return limit - count
    })
  }

  /** 후원 정보 조회 */
  async getSponsorshipById(id: number): Promise<SponsorshipResponseDto> {
    return this.prisma.sponsorship.findUnique({
      where: { id },
      select: {
        created_at: true,
        sponsorship_reword: {
          select: {
            id: true,
            count: true,
            reword: {
              select: { id: true, title: true, description: true, amount: true, expected_delivery_date: true },
            },
          },
        },
        project: {
          select: {
            id: true,
            status: true,
            title: true,
            target_amount: true,
            collected_amount: true,
            category: { select: { name: true } },
            created_by: { select: { nickname: true } },
            project_schedule: { select: { funding_due_date: true } },
          },
        },
      },
    })
  }
}
