import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSponsorshipRequestDto } from './dto'

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
}
