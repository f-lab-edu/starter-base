import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient<Prisma.PrismaClientOptions, 'query'> implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name)

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
    })
  }

  async onModuleInit() {
    await this.$connect()

    this.$on('query', (event: Prisma.QueryEvent) => {
      this.logger.log(`Query: ${event.query} \x1b[33m+${event.duration}ms\x1b[32m`)
    })
  }
}
