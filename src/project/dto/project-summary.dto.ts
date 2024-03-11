import { ProjectStatus } from '@prisma/client'

class ProjectCategory {
  id: number
  name: string
}

class User {
  id: number
  nickname: string
}

export class ProjectSummaryDto {
  id: number
  status: ProjectStatus
  title: string
  summary: string
  thumbnail_url: string
  target_amount: bigint
  collected_amount: bigint
  // TODO: 목표달성률 퍼센트
  category: ProjectCategory
  created_by: User
  // TODO: 펀딩마감일
}
