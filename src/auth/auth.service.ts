import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import * as dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

import { UsersRepository } from 'src/users/users.repository'
import { AuthTokensDto, LoginRequestDto } from './dto'
import { RefreshTokenRepository } from './refresh-token.repository'
import { MAX_CLIENT_TOKEN_COUNT, REFRESH_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_REDIS_KEY } from './constants'
import { AccessTokenPayload, RefreshTokenPayload } from './jwt.payload'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  /**
   * redis에 refresh token 저장
   */
  private async storeRefreshToken(refresh_token: string, userId: number, clientId: string): Promise<void> {
    await this.refreshTokenRepository.set(
      `${REFRESH_TOKEN_REDIS_KEY}:${userId}:${clientId}`,
      refresh_token,
      REFRESH_TOKEN_EXPIRATION_TIME,
    )
  }

  /**
   * user id 당 토큰 개수를 제한할 수 있도록 최대 개수를 넘었을 때 오래된 토큰을 제거하는 함수
   */
  private async maintainTokenCount(userId: number): Promise<void> {
    const refreshTokens = await this.refreshTokenRepository.getTTLsByPattern(`${REFRESH_TOKEN_REDIS_KEY}:${userId}:*`)

    // ttl 기준으로 정렬
    refreshTokens.sort((a, b) => a.ttl - b.ttl)

    // user id 당 최대 10개의 refresh token 유지
    if (refreshTokens.length > MAX_CLIENT_TOKEN_COUNT) {
      const keysToDelete = refreshTokens.slice(0, -MAX_CLIENT_TOKEN_COUNT)
      // 가장 오래된 refresh token부터 삭제
      await this.refreshTokenRepository.del(keysToDelete.map(({ key }) => key))
    }
  }

  /**
   * 로그인
   */
  async login({ email, password }: LoginRequestDto): Promise<AuthTokensDto> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const isPasswordValidated = await bcrypt.compare(password, user.password)

    if (!isPasswordValidated) {
      throw new UnauthorizedException('Invalid email or password')
    }

    const clientId = uuidv4()
    const accessTokenPayload: AccessTokenPayload = {
      sub: user.id,
      jti: clientId,
      iat: dayjs().unix(),
      exp: dayjs().add(1, 'hour').unix(),
      user_role: user.role,
    }
    const accessToken = this.jwtService.sign(accessTokenPayload)
    const refreshTokenPayload: RefreshTokenPayload = {
      sub: user.id,
      jti: clientId,
      iat: dayjs().unix(),
      exp: dayjs().add(7, 'day').unix(),
    }
    const refreshToken = this.jwtService.sign(refreshTokenPayload)

    await this.storeRefreshToken(refreshToken, user.id, clientId)
    await this.maintainTokenCount(user.id)

    // TODO: iss - 서버 배포 시 루트 도메인 사용
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }
}
