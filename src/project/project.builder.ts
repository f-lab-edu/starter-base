import { ProjectStatus } from '@prisma/client'
import { Project } from './domain'

/**
 * Project 빌더
 */
export class ProjectBulider {
  private title: string = ''
  private summary: string = ''
  private description: string = ''
  private thumbnail_url: string = ''
  private target_amount: bigint = BigInt(0)
  private collected_amount: bigint = BigInt(0)
  private created_by_id: number
  private category_id?: number

  constructor(private status: ProjectStatus, private id?: number) {}

  setContents(title?: string, summary?: string, description?: string, thumbnail_url?: string) {
    this.title = title
    this.summary = summary
    this.description = description
    this.thumbnail_url = thumbnail_url
    return this
  }

  setAmount(target_amount?: bigint, collected_amount?: bigint) {
    this.target_amount = target_amount
    this.collected_amount = collected_amount
    return this
  }

  setCreatedById(created_by_id: number) {
    this.created_by_id = created_by_id
    return this
  }

  setCategoryId(category_id?: number) {
    this.category_id = category_id
    return this
  }

  build() {
    if (!this.created_by_id) {
      throw new Error('Creator Id is required')
    }

    return new Project({
      id: this.id,
      status: this.status,
      title: this.title,
      summary: this.summary,
      description: this.description,
      thumbnail_url: this.thumbnail_url,
      target_amount: this.target_amount,
      collected_amount: this.collected_amount,
      created_by_id: this.created_by_id,
      category_id: this.category_id,
    })
  }
}
