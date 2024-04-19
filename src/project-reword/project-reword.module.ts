import { Module } from '@nestjs/common'
import { ProjectRewordController } from './project-reword.controller'
import { ProjectRewordService } from './project-reword.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ProjectRewordRepository } from './project-reword.repository'
import { ProjectModule } from '../project/project.module'

@Module({
  imports: [PrismaModule, ProjectModule],
  controllers: [ProjectRewordController],
  providers: [ProjectRewordService, ProjectRewordRepository],
  exports: [ProjectRewordService],
})
export class ProjectRewordModule {}
