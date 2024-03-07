import { ProjectStatus } from '@prisma/client'

export class Project {
  constructor(
    readonly id?: number,
    readonly status: ProjectStatus = ProjectStatus.DRAFT,
    readonly title?: string,
    readonly summary?: string,
    readonly description?: string,
    readonly thumbnail_url?: string,
    readonly target_amount?: bigint,
    readonly collected_amount: bigint = BigInt(0),
    readonly created_by_id?: number,
    readonly category_id?: number,
  ) {}
}
