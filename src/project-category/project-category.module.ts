import { Module } from '@nestjs/common'
import { ProjectCategoryController } from './project-category.controller'
import { ProjectCategoryService } from './project-category.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ProjectCategoryRepository } from './project-category.repository'

@Module({
  imports: [PrismaModule],
  providers: [ProjectCategoryService, ProjectCategoryRepository],
  controllers: [ProjectCategoryController],
})
export class ProjectCategoryModule {}
