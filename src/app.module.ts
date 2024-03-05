import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { FileModule } from './file/file.module'
import { ProjectCategoryModule } from './project-category/project-category.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
    }),
    AuthModule,
    UsersModule,
    FileModule,
    ProjectCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
