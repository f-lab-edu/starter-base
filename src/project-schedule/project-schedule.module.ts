import { forwardRef, Module } from '@nestjs/common'
import { ProjectScheduleService } from './project-schedule.service'
import { ProjectScheduleController } from './project-schedule.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ProjectScheduleRepository } from './project-schedule.repository'
import { ProjectModule } from '../project/project.module'

@Module({
  imports: [PrismaModule, forwardRef(() => ProjectModule)],
  providers: [ProjectScheduleService, ProjectScheduleRepository],
  controllers: [ProjectScheduleController],
  exports: [ProjectScheduleService],
})
export class ProjectScheduleModule {}
