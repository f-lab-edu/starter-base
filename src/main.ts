import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'
import * as winston from 'winston'
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston'

import { AppModule } from './app.module'
import { LoggerInterceptor } from './logger/logger.interceptor'

// serialize bigint
BigInt.prototype['toJSON'] = function () {
  return parseInt(this)
}

// serialize bigint
BigInt.prototype['toJSON'] = function () {
  return parseInt(this)
}

async function bootstrap() {
  const instance = winston.createLogger({
    transports: [
      new winston.transports.Console({
        level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('StarterBase', {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
    ],
  })
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })
  app.useLogger(
    WinstonModule.createLogger({
      instance,
    }),
  )
  app.enableCors({
    // TODO: 배포된 프론트엔드 url, 프론트엔드가 로컬로 개발 시 사용하는 localhost url
    origin: '*',
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
  })
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalInterceptors(new LoggerInterceptor())

  await app.listen(8000)
}
bootstrap()
