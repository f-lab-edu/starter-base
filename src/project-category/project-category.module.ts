import { forwardRef, Module } from '@nestjs/common'
import { ProjectCategoryController } from './project-category.controller'
import { ProjectCategoryService } from './project-category.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ProjectCategoryRepository } from './project-category.repository'
import { ProjectModule } from '../project/project.module'

@Module({
  imports: [PrismaModule, forwardRef(() => ProjectModule)],
  providers: [ProjectCategoryService, ProjectCategoryRepository],
  controllers: [ProjectCategoryController],
  exports: [ProjectCategoryService],
})
export class ProjectCategoryModule {}
