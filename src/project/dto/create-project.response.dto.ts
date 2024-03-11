import { ProjectStatus } from '@prisma/client'

export class CreateProjectResponseDto {
  id: number
  status: ProjectStatus
  title: string
  summary: string
  description: string
  thumbnail_url: string
  target_amount: bigint
  collected_amount: bigint
  created_by_id: number
  category_id: number | null
}
