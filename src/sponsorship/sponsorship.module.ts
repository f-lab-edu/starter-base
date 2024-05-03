import { Module } from '@nestjs/common'
import { SponsorshipController } from './sponsorship.controller'
import { SponsorshipService } from './sponsorship.service'
import { SponsorshipRepository } from './sponsorship.repository'
import { ProjectRewordModule } from '../project-reword/project-reword.module'
import { PrismaModule } from '../prisma/prisma.module'
import { ProjectModule } from '../project/project.module'

@Module({
  imports: [ProjectRewordModule, PrismaModule, ProjectModule],
  controllers: [SponsorshipController],
  providers: [SponsorshipService, SponsorshipRepository],
})
export class SponsorshipModule {}
