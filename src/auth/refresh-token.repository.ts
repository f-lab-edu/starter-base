import Redis, { RedisKey } from 'ioredis'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RefreshTokenRepository {
  private readonly redisClient: Redis

  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10),
    })
  }

  /**
   * key value 생성
   */
  async set(key: string, value: string, ms: number): Promise<'OK'> {
    return this.redisClient.set(key, value, 'PX', ms)
  }

  /**
   * key들에 해당하는 모든 value 삭제
   */
  async del(keys: RedisKey[]): Promise<number> {
    return this.redisClient.del(keys)
  }

  /**
   * pattern에 맞는 모든 key 조회
   */
  private async getKeysByPattern(pattern: string): Promise<RedisKey[]> {
    let cursor = '0'
    let keys: RedisKey[] = []

    do {
      const reply = await this.redisClient.scan(cursor, 'MATCH', pattern)
      cursor = reply[0]
      keys = keys.concat(reply[1])
    } while (cursor !== '0')

    return keys
  }

  /**
   * pattern에 맞는 모든 key의 모든 ttl 조회
   */
  async getTTLsByPattern(pattern: string): Promise<{ key: RedisKey; ttl: number }[]> {
    const keys = await this.getKeysByPattern(pattern)

    const results = await Promise.all(
      keys.map(async (key) => {
        const ttl = await this.redisClient.ttl(key)

        // ttl이 설정되지 않았거나(-1), 존재하지 않는 key일 경우(-2)
        if (ttl === -1 || ttl === -2) return null
        return { key, ttl }
      }),
    )

    return results.filter((value) => !!value)
  }
}
