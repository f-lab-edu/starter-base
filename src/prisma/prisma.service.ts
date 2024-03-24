import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'> implements OnModuleInit {
  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
        { emit: 'event', level: 'error' },
      ],
    })
  }

  async onModuleInit() {
    await this.$connect()

    this.$on('query', (event: Prisma.QueryEvent) => {
      Logger.log(`Query: ${event.query} +${event.duration}ms`, PrismaService.name)
    })
    this.$on('error', (event: Prisma.LogEvent) => {
      Logger.error(`Error: ${event.message} ${event.target}`, PrismaService.name)
    })
  }
}
