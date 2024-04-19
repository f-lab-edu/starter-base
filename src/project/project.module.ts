import { Module } from '@nestjs/common'
import { ProjectController } from './project.controller'
import { ProjectService } from './project.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ProjectRepository } from './project.repository'
import { ProjectCategoryModule } from 'src/project-category/project-category.module'
import { ProjectScheduleModule } from 'src/project-schedule/project-schedule.module'

@Module({
  imports: [PrismaModule, ProjectCategoryModule, ProjectScheduleModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  exports: [ProjectService],
})
export class ProjectModule {}
