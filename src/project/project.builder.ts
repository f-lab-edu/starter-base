import { ProjectStatus } from '@prisma/client'
import { Project } from './domain/project'
import { ProjectSchedule } from 'src/project-schedule/domain/project-schedule'

/**
 * Project 빌더
 */
export class ProjectBuilder {
  private title: string
  private summary: string
  private description: string
  private thumbnail_url: string
  private target_amount: bigint
  private collected_amount: bigint
  private created_by_id: number
  private category_id?: number
  private schedule: ProjectSchedule

  constructor(private status: ProjectStatus, private id?: number) {}

  setContents(title = '', summary = '', description = '', thumbnail_url = '') {
    this.title = title
    this.summary = summary
    this.description = description
    this.thumbnail_url = thumbnail_url
    return this
  }

  setAmount(target_amount = BigInt(0), collected_amount = BigInt(0)) {
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

  setSchedule(schedule: ProjectSchedule) {
    this.schedule = schedule
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
      schedule: this.schedule,
    })
  }
}
