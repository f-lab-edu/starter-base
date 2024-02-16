import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { UsersModule } from 'src/users/users.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { RefreshTokenRepository } from './refresh-token.repository'

@Module({
  imports: [UsersModule, JwtModule.register({ secret: process.env.JWT_SECRET })],
  providers: [AuthService, RefreshTokenRepository],
  controllers: [AuthController],
})
export class AuthModule {}
