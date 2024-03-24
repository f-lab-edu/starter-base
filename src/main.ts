import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { SwaggerModule } from '@nestjs/swagger'
import { LoggerService, LoggerInterceptor } from './common/logger'
import { config } from './common/config/swagger'

// serialize bigint
BigInt.prototype['toJSON'] = function () {
  return parseInt(this)
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  })

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  app.enableCors({
    // TODO: 배포된 프론트엔드 url, 프론트엔드가 로컬로 개발 시 사용하는 localhost url
    origin: '*',
    credentials: true,
    exposedHeaders: ['Content-Disposition'],
  })
  app.useLogger(LoggerService)
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.useGlobalInterceptors(new LoggerInterceptor())

  await app.listen(8000)
}
bootstrap()
