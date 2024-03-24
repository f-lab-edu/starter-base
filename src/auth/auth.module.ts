import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { UsersModule } from 'src/users/users.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { RefreshTokenRepository } from './refresh-token.repository'
import { JwtStrategy } from './jwt.strategy'
import { configuration } from 'src/common/config/env'
import { ConfigModule, ConfigType } from '@nestjs/config'

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [configuration.KEY],
      useFactory: (config: ConfigType<typeof configuration>) => ({ secret: config.node.jwtSecret }),
    }),
  ],
  providers: [AuthService, RefreshTokenRepository, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
