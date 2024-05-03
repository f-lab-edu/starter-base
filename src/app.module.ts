import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { FileModule } from './file/file.module'
import { ProjectCategoryModule } from './project-category/project-category.module'
import { ProjectModule } from './project/project.module'
import { LoggerMiddleware } from './common/logger'
import { configuration } from './common/config/env'
import { ProjectRewordModule } from './project-reword/project-reword.module'
import { ProjectScheduleModule } from './project-schedule/project-schedule.module'
import { SponsorshipModule } from './sponsorship/sponsorship.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`, `${process.cwd()}/.env`],
      load: [configuration],
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    FileModule,
    ProjectCategoryModule,
    ProjectModule,
    ProjectRewordModule,
    ProjectScheduleModule,
    SponsorshipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
