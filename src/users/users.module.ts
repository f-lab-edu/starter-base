import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UsersRepository } from './users.repository'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { ProjectModule } from '../project/project.module'

@Module({
  imports: [PrismaModule, ProjectModule],
  providers: [UsersRepository, UsersService],
  exports: [UsersRepository],
  controllers: [UsersController],
})
export class UsersModule {}
